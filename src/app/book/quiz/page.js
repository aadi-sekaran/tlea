'use client';
import { useState } from 'react';
import BackButton from '@/components/BackButton';

export default function Quiz() {
  const [picked, setPicked] = useState(null);
  const opts = [
    { id: 'a', text: 'Pizza from the place down the road', correct: false },
    { id: 'b', text: 'A biryani that took two hours', correct: true },
    { id: 'c', text: 'Nothing — we ate the crisps in the bag', correct: false },
    { id: 'd', text: 'Chinese from Talbot Street', correct: false },
  ];
  return (
    <section className="screen section-screen active has-back">
      <BackButton />
      <div className="section-inner">
        <div className="section-eyebrow">A small test</div>
        <h1 className="section-title">Things only <em>we</em> know</h1>
        <p className="section-subtitle">— sample question below —</p>
        <div className="quiz-card">
          <div className="quiz-count">Sample · 1 of 20</div>
          <div className="quiz-q">What did we order the first night in the apartment, before the furniture arrived?</div>
          <div className="quiz-opts">
            {opts.map(o => (
              <button
                key={o.id}
                className={`quiz-opt ${picked === o.id ? (o.correct ? 'correct' : 'wrong') : ''}`}
                onClick={() => setPicked(o.id)}
              >
                {o.text}
              </button>
            ))}
          </div>
          <p className="quiz-footnote">write 20 real questions in your own time</p>
        </div>
      </div>
    </section>
  );
}
