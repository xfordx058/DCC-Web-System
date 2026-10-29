import { Link, useLocation } from 'react-router-dom';

const lastUpdated = '2026-10-29';

function LegalContact() {
  return (
    <section className="legal-contact-card" aria-labelledby="legal-contact-heading">
      <h2 id="legal-contact-heading">Questions or privacy requests</h2>
      <p>Contact the Diocese of Catarman and mention the page or personal information involved.</p>
      <a href="mailto:diocesecatarman@gmail.com">diocesecatarman@gmail.com</a>
      <p>DCC Cathedral Compound, Catarman, Northern Samar, Philippines</p>
    </section>
  );
}

function PrivacyPolicy() {
  return (
    <>
      <p className="legal-lede">This notice explains what information the Diocese of Catarman website uses, why it is used, and how you can ask about it.</p>
      <section>
        <h2>Information used by this website</h2>
        <ul>
          <li><strong>Administrator accounts:</strong> name and email address used to identify authorized administrators. Sign-in and password-reset credentials are handled by Firebase Authentication; passwords are not written to the site’s activity logs.</li>
          <li><strong>Administrator activity:</strong> administrator email or display name, action, timestamp, and related details are recorded for site operations and security. Details may include information an administrator entered or changed.</li>
          <li><strong>Published content and uploads:</strong> parish, clergy, event, announcement, donation-channel, and other information that administrators publish, including names, descriptions, images, and account instructions.</li>
          <li><strong>Technical information:</strong> your browser and network necessarily communicate technical information, such as an IP address, with the hosting and service providers that deliver this website.</li>
          <li><strong>Maintenance access check:</strong> only while a maintenance window is active, and only when an IP whitelist has entries, the site asks ipify to return the visitor’s public IP so the browser can compare it with the whitelist. The site does not add that visitor IP to its activity log. ipify receives the request and may process connection information under its own practices.</li>
          <li><strong>Browser storage:</strong> the admin interface stores display preferences such as list/grid view and sidebar state. Firebase Authentication also uses browser storage according to the “Remember me” option on the administrator sign-in page.</li>
        </ul>
      </section>
      <section>
        <h2>Why information is used</h2>
        <p>Information is used to publish diocesan information, operate and secure the site, authenticate administrators, maintain activity records, enforce the maintenance access check, and respond when you contact the Diocese by email or telephone. The site does not provide a public contact form.</p>
      </section>
      <section>
        <h2>Service providers and external websites</h2>
        <p>The site uses Firebase services provided by Google for authentication, database, file storage, and hosting. Google Maps, Facebook, YouTube, Open-Meteo, RainViewer, and ipify may receive technical information from your browser when the related feature is used. Their own privacy terms apply to their services. The Diocese does not sell personal information through this website.</p>
      </section>
      <section>
        <h2>Retention and security</h2>
        <p>Published information is kept while it remains relevant to diocesan communications and may be removed or updated by an administrator. Account and activity records are kept for as long as they are needed for administration, security, or applicable recordkeeping requirements, then deleted or deactivated when no longer needed. The Diocese uses access controls and its service providers’ security features, but no internet transmission or storage system can be guaranteed to be completely risk-free.</p>
      </section>
      <section>
        <h2>Your privacy rights</h2>
        <p>Subject to applicable law, you may ask whether your personal information is being processed and request access, correction, blocking, erasure, or other available remedies. Contact the Diocese using the details below so your request can be reviewed. You may also learn about data subject rights from the <a href="https://privacy.gov.ph/data-subject-rights/" target="_blank" rel="noopener noreferrer">National Privacy Commission</a>.</p>
      </section>
      <section>
        <h2>Updates to this notice</h2>
        <p>This notice may be updated when the website or its information practices change. The date above shows when this version was last reviewed.</p>
      </section>
      <LegalContact />
    </>
  );
}

function TermsOfUse() {
  return (
    <>
      <p className="legal-lede">These terms apply when you access or use the Diocese of Catarman website. Please use the site lawfully and respect the people and communities represented here.</p>
      <section>
        <h2>Using this website</h2>
        <p>You may browse and use the site for personal, informational, educational, and diocesan purposes. Do not attempt to access administrator systems without authorization, disrupt the site, introduce malicious code, misuse published contact information, or use the site in a way that violates applicable law or another person’s rights.</p>
      </section>
      <section>
        <h2>Information and schedules</h2>
        <p>Website content is provided for general information. Parish details, event schedules, livestreams, and announcements may change. Please contact the Diocese or the relevant parish to confirm information before relying on it for an important decision.</p>
      </section>
      <section>
        <h2>Donations</h2>
        <p>The site may display donation instructions or payment details published by the Diocese. Check the recipient and instructions carefully before sending money. Payment is made through the selected bank, wallet, or payment provider; that provider’s terms and privacy practices apply to the transaction. The website does not ask you to enter card passwords or online banking credentials.</p>
      </section>
      <section>
        <h2>Content and external services</h2>
        <p>Unless otherwise stated, website text, design, and media are owned by or used with permission by the Diocese. Do not reproduce or redistribute them in a way that infringes rights or misrepresents the Diocese. The site may link to or embed third-party services; the Diocese does not control their content, availability, or terms.</p>
      </section>
      <section>
        <h2>Availability and changes</h2>
        <p>The Diocese may update, suspend, or remove website features or content as needed. The site is provided subject to applicable law, and the Diocese does not guarantee uninterrupted availability or that every item of information will always be error-free.</p>
      </section>
      <section>
        <h2>Privacy</h2>
        <p>Use of personal information is described in our <Link to="/privacy-policy">Privacy Policy</Link>. By using the site, you acknowledge that you have had the opportunity to read that notice.</p>
      </section>
      <section>
        <h2>Changes to these terms</h2>
        <p>These terms may be revised when the website changes. Continued use after a revision means the updated terms apply to your future use of the site.</p>
      </section>
      <LegalContact />
    </>
  );
}

export default function Legal() {
  const location = useLocation();
  const isPrivacy = location.pathname === '/privacy-policy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Use';

  return (
    <article className="public-page-stack legal-document">
      <header className="public-page-heading">
        <p className="admin-eyebrow">Diocese of Catarman</p>
        <h1>{title}</h1>
        <p>Last updated <time dateTime={lastUpdated}>October 29, 2026</time></p>
      </header>
      <nav className="legal-switcher" aria-label="Legal pages">
        <Link to="/terms" aria-current={!isPrivacy ? 'page' : undefined} className={!isPrivacy ? 'is-active' : ''}>Terms of Use</Link>
        <Link to="/privacy-policy" aria-current={isPrivacy ? 'page' : undefined} className={isPrivacy ? 'is-active' : ''}>Privacy Policy</Link>
      </nav>
      <div className="legal-content">{isPrivacy ? <PrivacyPolicy /> : <TermsOfUse />}</div>
    </article>
  );
}
