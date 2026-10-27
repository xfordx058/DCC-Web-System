const manilaDateFormatter = new Intl.DateTimeFormat('en-PH', {
  timeZone: 'Asia/Manila',
  month: '2-digit',
  day: '2-digit',
});

export const BIRTHDAY_PATTERN = '^(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|02-(?:0[1-9]|1\\d|2[0-9]))$';

export function getManilaMonthDay(date = new Date()): string {
  const parts = manilaDateFormatter.formatToParts(date);
  const month = parts.find(part => part.type === 'month')?.value ?? '01';
  const day = parts.find(part => part.type === 'day')?.value ?? '01';
  return `${month}-${day}`;
}

export function isBirthdayOn(value: unknown, monthDay: string): boolean {
  const match = String(value ?? '').trim().match(/^(?:(\d{4})[-/])?(\d{1,2})[-/](\d{1,2})$/);
  if (!match) return false;

  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > new Date(Date.UTC(2000, month, 0)).getUTCDate()) return false;

  return `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` === monthDay;
}

type BirthdayPerson = {
  id?: unknown;
  name?: unknown;
  birthday?: unknown;
  status?: unknown;
  isCurrent?: unknown;
};

export function getBirthdayAnnouncement(
  priests: BirthdayPerson[],
  bishops: BirthdayPerson[],
  monthDay: string
): string {
  const priestNotices = priests
    .filter(priest => String(priest.status ?? 'active').toLowerCase() !== 'inactive' && isBirthdayOn(priest.birthday, monthDay))
    .map(priest => String(priest.name ?? '').trim())
    .filter(Boolean)
    .map(name => `Happy birthday to our priest, ${name}!`);
  const bishopNotices = bishops
    .filter(bishop => bishop.isCurrent === true && isBirthdayOn(bishop.birthday, monthDay))
    .map(bishop => String(bishop.name ?? '').trim())
    .filter(Boolean)
    .map(name => `Happy birthday to our bishop, ${name}!`);

  return [...priestNotices, ...bishopNotices].join(' • ');
}
