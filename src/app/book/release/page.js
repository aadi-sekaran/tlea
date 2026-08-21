'use client';
import { useState } from 'react';
import BackButton from '@/components/BackButton';

export default function Release() {
  const [confirming, setConfirming] = useState(null);
  return (
    <section className="screen release-screen active has-back">
      <BackButton />
      <div className="release-inner">
        <h3>You can keep this. You can also let it go.</h3>
        <p className="release-body">
          Both are okay. Choose the timer and two reminder emails will come during the countdown.
          You can cancel any time. Only your profile is removed. The book itself stays for me, always.
        </p>
        <div className="release-buttons">
          <button className="release-btn keep">Keep this</button>
          <button className="release-btn timer">Erase my profile in 30 days</button>
          <button className="release-btn let-go">Let this go, now</button>
        </div>
        <p className="release-footnote">These buttons are wired in the next update.</p>
      </div>
    </section>
  );
}
