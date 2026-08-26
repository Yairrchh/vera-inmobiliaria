import { useEffect, useRef, useState } from 'react'

// Fires once when the element enters the viewport; drives the .animate-rise
// class and the Underline signature stroke without re-triggering on re-scroll.
export function useReveal(threshold = 0.2) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }

    // Elements already on screen when the page (or a client-side route
    // transition) mounts should reveal right away rather than wait on an
    // observer callback that has nothing to "scroll into" — there's no
    // guarantee it fires promptly around a route change.
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return [ref, visible]
}
