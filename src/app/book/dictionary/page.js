import { DICTIONARY } from '@/lib/content';
import BackButton from '@/components/BackButton';
import Image from 'next/image';

function Shelf({ head, icon, entries, twoDragons = false }) {
  return (
    <div className="dict-shelf">
      <div className="dict-shelf-head">
        {twoDragons ? (
          <span className="dragon-pair-inline">
            <Image src="/dragon-dark.webp" alt="" width={22} height={22} />
            <Image src="/dragon-light.webp" alt="" width={22} height={22} />
          </span>
        ) : (
          <Image src={icon} alt="" width={26} height={26} />
        )}
        {head}
      </div>
      <div className="dict-entries">
        {entries.map((e, i) => (
          <div key={i} className="dict-entry">
            <div className="dict-word">
              {e.word}{e.extra && <em>· {e.extra}</em>}
            </div>
            {e.note && <span className="dict-note">{e.note}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dictionary() {
  return (
    <section className="screen section-screen active has-back">
      <BackButton />
      <div className="section-inner">
        <div className="section-eyebrow">Dictionary of us</div>
        <h1 className="section-title">Words only <em>we</em> know</h1>
        <p className="section-subtitle">— every name, in every direction —</p>

        <Shelf head="From him, to her" icon="/dragon-dark.webp" entries={DICTIONARY.fromHim} />
        <Shelf head="From her, to him" icon="/dragon-light.webp" entries={DICTIONARY.fromHer} />
        <Shelf head="Shared — either direction" entries={DICTIONARY.shared} twoDragons />

        <p className="dict-tail">— she adds any she remembers, on her side —</p>
      </div>
    </section>
  );
}
