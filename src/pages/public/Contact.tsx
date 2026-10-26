import LazyIframe from '@/components/ui/LazyIframe';

export default function Contact() {
  return (
    <div className="public-page-stack">
      <header className="public-page-heading"><p className="admin-eyebrow">Reach the Diocese</p><h1>Contact & Location</h1><p>Connect with the Diocese of Catarman for pastoral concerns, parish information, and community inquiries.</p></header>
      <section className="public-contact-grid">
        <div className="public-content-card"><p className="admin-eyebrow">Contact details</p><h2>Diocese of Catarman</h2><dl className="public-contact-list"><div><dt>Email</dt><dd><a href="mailto:diocesecatarman@gmail.com">diocesecatarman@gmail.com</a></dd></div><div><dt>Telephone</dt><dd><a href="tel:+63907679132">+63 09076-79132 (TM)</a></dd></div><div><dt>Telephone</dt><dd><a href="tel:+63907663961">+63 09076-63961 (TNT)</a></dd></div><div><dt>Location</dt><dd>Catarman Cathedral, Northern Samar</dd></div></dl></div>
        <div className="public-map-frame"><LazyIframe className="h-full w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.1397457927727!2d125.12647767463297!3d12.490314191585706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33f4ba10a91c8f53%3A0x6d499d2a1b3a91f!2sCatarman%20Cathedral!5e0!3m2!1sen!2sph!4v1716174935720!5m2!1sen!2sph" title="Catarman Cathedral map" /></div>
      </section>
    </div>
  );
}
