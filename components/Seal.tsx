/** The one stamp on the site: a round "EST. 1974" seal in accent outline. */
export function Seal({ className = "", tone = "paper" }: { className?: string; tone?: "paper" | "ink" }) {
  const fill = tone === "paper" ? "#F6F3EC" : "#0E2338";
  const stroke = tone === "paper" ? "#0079C0" : "#F6F3EC";
  return (
    <svg viewBox="0 0 160 160" className={className} role="img" aria-label="Established 1974">
      <defs>
        <path id={`seal-ring-${tone}`} d="M 80,80 m -57,0 a 57,57 0 1,1 114,0 a 57,57 0 1,1 -114,0" fill="none" />
      </defs>
      <circle cx="80" cy="80" r="77" fill={fill} stroke={stroke} strokeWidth="2" />
      <circle cx="80" cy="80" r="69" fill="none" stroke={stroke} strokeWidth="1" />
      <circle cx="80" cy="80" r="43" fill="none" stroke={stroke} strokeWidth="1" />
      <text fill={stroke} fontSize="10" fontWeight="600" style={{ fontFamily: "var(--font-sans)" }}>
        <textPath href={`#seal-ring-${tone}`} textLength="352" lengthAdjust="spacing" dominantBaseline="central">
          KAIFER INSURANCE GROUP · COCKEYSVILLE · MARYLAND ·
        </textPath>
      </text>
      <text x="80" y="72" textAnchor="middle" fill={stroke} fontSize="10" fontWeight="600" letterSpacing="3" style={{ fontFamily: "var(--font-sans)" }}>
        EST.
      </text>
      <text x="80" y="97" textAnchor="middle" fill={stroke} fontSize="25" fontWeight="500" style={{ fontFamily: "var(--font-display)" }}>
        1974
      </text>
    </svg>
  );
}
