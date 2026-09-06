import DragonLoader from '@/components/DragonLoader';

export default function BookLoading() {
  return (
    <div className="book-loading-screen">
      <DragonLoader label="loading..." />
    </div>
  );
}
