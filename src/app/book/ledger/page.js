import BackButton from '@/components/BackButton';

export default function Page() {
  return (
    <section className="screen section-screen active has-back">
      <BackButton />
      <div className="section-inner">
        <div className="section-eyebrow">Ledger of numbers</div>
        <h1 className="section-title" dangerouslySetInnerHTML={{ __html: 'What we <em>counted</em>' }} />
        <p className="section-subtitle">— every number that carries a story —</p>
        <div className="empty-notice">
          <div className="icon">№</div>
          <h4>Days together · flights · cities · meals · fights survived</h4>
          <p dangerouslySetInnerHTML={{ __html: `Every number that carries a story.<br /><br /><em>Fill this yourself, or I calculate what I can from what you tell me.</em>` }} />
        </div>
      </div>
    </section>
  );
}
