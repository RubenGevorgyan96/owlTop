import { useEffect, useState } from 'react'

export const useScrollY = (): number => {
  const [scrollY, setCrollY] = useState<number>(0)
  const isBrowser = typeof window !== undefined

  const scrollHandler = () => {
    const currentScrollY = isBrowser ? window.scrollY : 0

    setCrollY(currentScrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, { passive: true })
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  return scrollY
}
