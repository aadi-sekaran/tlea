import { readSession } from '@/lib/session';

// Small circular avatar of whichever dragon is logged in, for the top-nav.
// asset: public/dragons/01_Main_Pack/main_009.png (dark) / main_023.png (light)
export default async function NavAvatar() {
  const session = await readSession();
  if (!session?.role) return <span />;
  const src = session.role === 'dark'
    ? '/dragons/01_Main_Pack/main_009.png'
    : '/dragons/01_Main_Pack/main_023.png';
  return <img src={src} alt="" className="nav-avatar" width={32} height={32} />;
}
