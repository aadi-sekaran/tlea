import BackButton from '@/components/BackButton';

export default function Polaroids() {
  return (
    <section className="screen section-screen active has-back">
      <BackButton />
      <div className="section-inner">
        <div className="section-eyebrow">Polaroids</div>
        <h1 className="section-title">The <em>real</em> ones</h1>
        <p className="section-subtitle">— slots waiting for the ones you shot —</p>
        <div className="polaroid-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="polaroid">
              <div className="polaroid-photo">[ your polaroid ]</div>
              <div className="polaroid-caption">— caption —</div>
            </div>
          ))}
        </div>
        <p className="polaroid-tail">15 to 18 slots, waiting for the real ones</p>
      </div>
    </section>
  );
}
