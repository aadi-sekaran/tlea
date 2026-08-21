import BackButton from '@/components/BackButton';
import Image from 'next/image';

export default function Cast() {
  return (
    <section className="screen section-screen active has-back">
      <BackButton />
      <div className="section-inner">
        <div className="section-eyebrow">Cast</div>
        <h1 className="section-title">Two <em>Ammus</em></h1>
        <p className="section-subtitle">— the ones this book is for and from —</p>

        <div className="cast-pair">
          <div className="cast-card">
            <div className="cast-dragon"><Image src="/dragon-dark.webp" alt="dark dragon" width={100} height={100} /></div>
            <div className="cast-name">Ammu</div>
            <div className="cast-tag">The dark one · Aadi</div>
            <div className="cast-epigraph">&quot;still trying to play the guitar&quot;</div>
            <dl className="cast-facts">
              <dt>Known for</dt><dd>overplanning trips, undercooking rice.</dd>
              <dt>Afraid of</dt><dd>the quiet after a real fight.</dd>
              <dt>Favourite lie</dt><dd>&quot;I&apos;m not tired.&quot;</dd>
            </dl>
            <p className="cast-secret">I say sorry too much and mean it every time.</p>
          </div>
          <div className="cast-card light-side">
            <div className="cast-dragon"><Image src="/dragon-light.webp" alt="light dragon" width={100} height={100} /></div>
            <div className="cast-name">Ammu</div>
            <div className="cast-tag">The white one · Krithika</div>
            <div className="cast-epigraph">— you fill this in —</div>
            <dl className="cast-facts">
              <dt>Known for</dt><dd>[to be written]</dd>
              <dt>Afraid of</dt><dd>[to be written]</dd>
              <dt>Favourite lie</dt><dd>[to be written]</dd>
            </dl>
            <p className="cast-secret">[your line]</p>
          </div>
        </div>
      </div>
    </section>
  );
}
