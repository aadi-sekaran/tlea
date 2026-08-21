import BackButton from '@/components/BackButton';

export default function Page() {
  return (
    <section className="screen section-screen active has-back">
      <BackButton />
      <div className="section-inner">
        <div className="section-eyebrow">On this day</div>
        <h1 className="section-title" dangerouslySetInnerHTML={{ __html: 'Across three <em>years</em>' }} />
        <p className="section-subtitle">— a page that changes every visit —</p>
        <div className="empty-notice">
          <div className="icon">◐</div>
          <h4>A living page — different every time you open it</h4>
          <p dangerouslySetInnerHTML={{ __html: `Feb 18: the Facebook post. June &#39;23: the closed coffee shop. Sept 19 across three years: everything.<br /><br /><em>Populates as you tag dated moments.</em>` }} />
        </div>
      </div>
    </section>
  );
}
