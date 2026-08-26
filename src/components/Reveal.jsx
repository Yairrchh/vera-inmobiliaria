import { useReveal } from '../hooks/useReveal'

// Generic scroll-triggered fade+rise wrapper, built on the same
// useReveal hook that drives PropertyCard and the Underline signature.
function Reveal({ children, as: Tag = 'div', className = '', delay = 0, threshold = 0.15 }) {
  const [ref, visible] = useReveal(threshold)

  return (
    <Tag
      ref={ref}
      className={`${visible ? 'animate-rise' : 'opacity-0'} ${className}`}
      style={visible && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

export default Reveal
