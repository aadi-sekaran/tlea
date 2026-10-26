import BackToContents from '@/components/BackToContents';
import NavAvatar from '@/components/NavAvatar';
import SafeImg from '@/components/SafeImg';
import VoiceNotesPlayer from '@/components/VoiceNotesPlayer';
import { getVoiceNotes } from '@/lib/voiceNotes';
import { HEADER_ART } from '@/lib/dragons';

export default function VoiceNotesPage() {
  const notes = getVoiceNotes();

  return (
    <div className="book-shell">
      <div className="top-nav">
        <BackToContents />
        <span className="nav-title">Voice Notes</span>
        <NavAvatar />
      </div>
      <div className="content-page">
        <SafeImg srcs={HEADER_ART.voicenotes} alt="" className="content-header-art" />
        <p className="content-eyebrow">random recordings, hers and mine</p>
        <h1 className="content-title">Voice Notes</h1>
        <p className="content-intro">
          Funny ones. Old ones. The ones neither of us remembered making. Hit next and see what comes up.
        </p>
        <VoiceNotesPlayer notes={notes} />
      </div>
    </div>
  );
}
