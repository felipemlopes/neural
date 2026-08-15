const DATA_1 = [40, 55, 38, 70, 62, 80, 72, 90, 85, 95, 88, 102];
const DATA_2 = [30, 40, 50, 35, 55, 48, 60, 52, 70, 65, 75, 80];
const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const W = 420;
const H = 120;
const MAX = 110;
const MIN = 25;

function toPoints(d: number[]) {
  return d.map((v, i) => `${(i / (d.length - 1)) * W},${H - ((v - MIN) / (MAX - MIN)) * H}`).join(" ");
}

export default function LineChart() {
  const pts1 = toPoints(DATA_1);
  const pts2 = toPoints(DATA_2);

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 30}`} preserveAspectRatio="xMidYMid meet">
      {[0, 1, 2, 3].map((i) => (
        <line key={`g${i}`} x1={0} y1={(H / 3) * i} x2={W} y2={(H / 3) * i} stroke="rgba(0,212,232,0.06)" strokeWidth="1" />
      ))}
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d4e8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#00d4e8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00aaff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00aaff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${H} ${pts2} ${W},${H}`} fill="url(#g2)" />
      <polygon points={`0,${H} ${pts1} ${W},${H}`} fill="url(#g1)" />
      <polyline points={pts2} fill="none" stroke="#00aaff" strokeWidth="2" />
      <polyline points={pts1} fill="none" stroke="#00d4e8" strokeWidth="2" />
      {MONTHS.map((m, i) => (
        <text
          key={`m${i}`}
          x={(i / (MONTHS.length - 1)) * W}
          y={H + 20}
          fill="#3d5060"
          fontSize="10"
          textAnchor="middle"
          fontFamily="var(--font-body)"
        >
          {m}
        </text>
      ))}
    </svg>
  );
}