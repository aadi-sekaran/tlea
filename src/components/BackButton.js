'use client';
import Link from 'next/link';

export default function BackButton({ href = '/book', label = 'Contents' }) {
  return (
    <Link href={href} className="back-btn">
      {label}
    </Link>
  );
}
