import BackButton from '@/components/BackButton';

export default function Page() {
  return (
    <section className="screen section-screen active has-back">
      <BackButton />
      <div className="section-inner">
        <div className="section-eyebrow">Time capsule</div>
        <h1 className="section-title" dangerouslySetInnerHTML={{ __html: 'Sealed until <em>Sept 19, 2027</em>' }} />
        <p className="section-subtitle">— two letters, one date —</p>
        <div className="empty-notice">
          <div className="icon">✉</div>
          <h4>Two letters, one date</h4>
          <p dangerouslySetInnerHTML={{ __html: `One from you, one from her. Both written now, sealed by the site, unlockable only on the anniversary that would have been our fourth.<br /><br /><em>Neither of us can open it early. Not even you.</em>` }} />
        </div>
      </div>
    </section>
  );
}
