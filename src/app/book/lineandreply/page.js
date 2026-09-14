import BackToContents from '@/components/BackToContents';
import NavAvatar from '@/components/NavAvatar';
import LineAndReplyCard from '@/components/LineAndReplyCard';
import { LINE_AND_REPLY } from '@/lib/content';

export default function LineAndReplyPage() {
  return (
    <div className="book-shell">
      <div className="top-nav">
        <BackToContents />
        <span className="nav-title">The Line and the Reply</span>
        <NavAvatar />
      </div>
      <LineAndReplyCard exchanges={LINE_AND_REPLY} />
    </div>
  );
}
