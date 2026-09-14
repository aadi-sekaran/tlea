'use client';

import { useRouter } from 'next/navigation';

// Goes back to the same scroll position on the contents page instead of a
// fresh top-of-page navigation, by popping browser history when we can.
export default function BackToContents() {
  const router = useRouter();

  function handleClick(e) {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/book');
    }
  }

  return (
    <a href="/book" className="nav-back" onClick={handleClick}>← contents</a>
  );
}
