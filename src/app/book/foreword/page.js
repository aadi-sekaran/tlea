import { FOREWORD } from '@/lib/content';
import BackButton from '@/components/BackButton';
import Image from 'next/image';

export default function Foreword() {
  return (
    <section className="screen section-screen active has-back">
      <BackButton />
      <div className="section-inner">
        <div className="section-eyebrow">Foreword</div>
        <h1 className="section-title">For <em>you</em></h1>
        <p className="section-subtitle">— from me, one last time</p>
        <div className="foreword-body">
          {FOREWORD.map((p, i) => <p key={i}>{p}</p>)}
          <div className="signoff">
            — your Ammu <span className="inline-dragon"><Image src="/dragon-dark.webp" alt="" width={28} height={28} /></span>
          </div>
        </div>
      </div>
    </section>
  );
}
