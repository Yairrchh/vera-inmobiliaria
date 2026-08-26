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

    // Safety net: some environments (throttled/background tabs, rare
    // browser quirks) delay or never fire the observer. Content must
    // never stay permanently hidden because of it.
    const fallback = setTimeout(() => setVisible(true), 1500)

    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [threshold])

  return [ref, visible]
}
