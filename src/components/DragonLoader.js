// asset: public/dragons/02_Flying_Poses/flying_001.png (single flying dragon)
export default function DragonLoader({ label }) {
  return (
    <div className="dragon-loader">
      <img src="/dragons/02_Flying_Poses/flying_001.png" alt="" className="dragon-loader-img" />
      {label && <p className="dragon-loader-label">{label}</p>}
    </div>
  );
}
