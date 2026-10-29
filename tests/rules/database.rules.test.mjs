import { readFileSync } from 'node:fs';
import { after, before, beforeEach, describe, it } from 'node:test';
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { get, ref, set, update } from 'firebase/database';

const PROJECT_ID = 'demo-dcc-rules';
const RULES = readFileSync(new URL('../../database.rules.json', import.meta.url), 'utf8');

let testEnv;

before(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    database: {
      rules: RULES,
      host: '127.0.0.1',
      port: 9000,
    },
  });
});

after(async () => {
  await testEnv?.cleanup();
});

beforeEach(async () => {
  await testEnv.clearDatabase();
});

const asAdmin = () => testEnv.authenticatedContext('admin-1', { email: 'admin@example.com' }).database();
const asUser = () => testEnv.authenticatedContext('user-1', { email: 'user@example.com' }).database();
const asAnonymous = () => testEnv.unauthenticatedContext().database();

async function seed(path, value) {
  await testEnv.withSecurityRulesDisabled(async context => {
    await set(ref(context.database(), path), value);
  });
}

async function seedAdmin() {
  await seed('admins/admin-1', {
    name: 'Test Administrator',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
  });
}

describe('anonymous reads', () => {
  it('allows the public content collections', async () => {
    for (const path of ['bishops', 'churches', 'priests', 'events', 'yearOf', 'streams', 'heroes', 'announcements', 'donationOptions']) {
      await seed(path, { sample: { name: 'Public record' } });
      await assertSucceeds(get(ref(asAnonymous(), path)), `anonymous read should be allowed for ${path}`);
    }
  });

  it('allows the public maintenance configuration', async () => {
    await seed('maintenanceMode/config', { enabled: false, message: 'Down for maintenance' });
    await assertSucceeds(get(ref(asAnonymous(), 'maintenanceMode/config')));
  });

  it('denies administrator accounts', async () => {
    await seedAdmin();
    await assertFails(get(ref(asAnonymous(), 'admins')));
    await assertFails(get(ref(asAnonymous(), 'admins/admin-1')));
  });

  it('denies audit logs, settings, donations, and weather logs', async () => {
    await seed('activityLogs/log-1', { action: 'Signed in' });
    await seed('maintenanceLogs/log-1', { action: 'Maintenance' });
    await seed('weatherEventLogs/log-1', { eventType: 'Rain' });
    await seed('settings', { theme: 'dark' });
    await seed('donations/donation-1', { donorName: 'Private donor', amount: 100 });

    await assertFails(get(ref(asAnonymous(), 'activityLogs')));
    await assertFails(get(ref(asAnonymous(), 'maintenanceLogs')));
    await assertFails(get(ref(asAnonymous(), 'weatherEventLogs')));
    await assertFails(get(ref(asAnonymous(), 'settings')));
    await assertFails(get(ref(asAnonymous(), 'donations')));
  });

  it('only exposes the IP allowlist while maintenance is enabled', async () => {
    await seed('whitelistedIPs/key-1', '203.0.113.10');

    await assertFails(get(ref(asAnonymous(), 'whitelistedIPs')));

    await seed('maintenanceMode/config', { enabled: true });
    await assertSucceeds(get(ref(asAnonymous(), 'whitelistedIPs')));

    await seed('maintenanceMode/config', { enabled: 'true' });
    await assertSucceeds(get(ref(asAnonymous(), 'whitelistedIPs')));
  });
});

describe('writes', () => {
  it('denies anonymous writes to public content', async () => {
    await assertFails(set(ref(asAnonymous(), 'churches/church-1'), { name: 'Injected' }));
    await assertFails(set(ref(asAnonymous(), 'activityLogs/log-1'), { action: 'Injected' }));
  });

  it('denies signed-in non-administrators', async () => {
    await assertFails(set(ref(asUser(), 'churches/church-1'), { name: 'Injected' }));
    await assertFails(set(ref(asUser(), 'settings'), { theme: 'dark' }));
    await assertFails(set(ref(asUser(), 'activityLogs/log-1'), { action: 'Injected' }));
  });

  it('does not let a non-administrator add themselves to the admin list', async () => {
    await assertFails(set(ref(asUser(), 'admins/user-1'), { name: 'Self promoted', email: 'user@example.com' }));
  });

  it('allows administrators to manage content and settings', async () => {
    await seedAdmin();
    await assertSucceeds(set(ref(asAdmin(), 'churches/church-1'), { name: 'St. Joseph' }));
    await assertSucceeds(update(ref(asAdmin(), 'settings'), { theme: 'dark' }));
    await assertSucceeds(set(ref(asAdmin(), 'activityLogs/log-1'), { action: 'Updated a parish' }));
  });

  it('allows administrators to register another administrator', async () => {
    await seedAdmin();
    await assertSucceeds(set(ref(asAdmin(), 'admins/admin-2'), { name: 'Second Admin', email: 'second@example.com' }));
    await assertFails(set(ref(asAdmin(), 'admins/admin-3'), { name: 123, email: 'third@example.com' }));
  });
});

describe('administrator reads', () => {
  it('allows an administrator to read restricted data', async () => {
    await seedAdmin();
    await seed('activityLogs/log-1', { action: 'Signed in' });
    await seed('settings', { theme: 'dark' });
    await seed('donations/donation-1', { donorName: 'Private donor', amount: 100 });

    await assertSucceeds(get(ref(asAdmin(), 'admins')));
    await assertSucceeds(get(ref(asAdmin(), 'activityLogs')));
    await assertSucceeds(get(ref(asAdmin(), 'settings')));
    await assertSucceeds(get(ref(asAdmin(), 'donations')));
  });

  it('allows a signed-in user to read only their own admin entry', async () => {
    await seed('admins/user-1', { name: 'Limited User', email: 'user@example.com' });
    await seedAdmin();

    await assertSucceeds(get(ref(asUser(), 'admins/user-1')));
    await assertFails(get(ref(asUser(), 'admins')));
    await assertFails(get(ref(asUser(), 'admins/admin-1')));
  });
});
