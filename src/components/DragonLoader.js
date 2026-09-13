import SafeImg from '@/components/SafeImg';
import { LOADING_ART } from '@/lib/dragons';

export default function DragonLoader({ label }) {
  return (
    <div className="dragon-loader">
      <SafeImg srcs={LOADING_ART} alt="" className="dragon-loader-img" />
      {label && <p className="dragon-loader-label">{label}</p>}
    </div>
  );
}
