import BackButton from '@/components/BackButton';

export default function Page() {
  return (
    <section className="screen section-screen active has-back">
      <BackButton />
      <div className="section-inner">
        <div className="section-eyebrow">Firsts & Lasts</div>
        <h1 className="section-title" dangerouslySetInnerHTML={{ __html: 'The parallel <em>column</em>' }} />
        <p className="section-subtitle">— two columns, side by side —</p>
        <div className="empty-notice">
          <div className="icon">§</div>
          <h4>Two columns, side by side</h4>
          <p dangerouslySetInnerHTML={{ __html: `First meal in Dublin / last meal together. First fight / last fight. First "I love you" / last one. The last column stays blank until it isn&#39;t.<br /><br /><em>Add entries whenever they come to you.</em>` }} />
        </div>
      </div>
    </section>
  );
}
