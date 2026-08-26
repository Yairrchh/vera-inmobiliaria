// Signature motif: a hand-drawn stroke that marks what matters —
// price, headline — echoing "Vera" (lo verdadero / lo genuino).
function Underline({ className = '', width = 260, height = 10, visible = false, delay = 0 }) {
  const dash = width + 40
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d={`M2 ${height - 3} C ${width * 0.3} 2, ${width * 0.7} ${height - 6}, ${width - 2} 3`}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          strokeDasharray: dash,
          strokeDashoffset: visible ? 0 : dash,
          transition: `stroke-dashoffset 0.9s cubic-bezier(0.65,0,0.35,1) ${delay}ms`,
        }}
      />
    </svg>
  )
}

export default Underline
