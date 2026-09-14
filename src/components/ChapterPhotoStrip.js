'use client';

// A horizontal-scrolling filmstrip of a chapter's real photos, one full
// frame at a time. Used instead of a single cropped hero image whenever a
// chapter actually has uploaded photos.
export default function ChapterPhotoStrip({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="chapter-photo-strip">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="chapter-photo-strip-img"
          loading={i < 2 ? 'eager' : 'lazy'}
        />
      ))}
    </div>
  );
}
