import React, { useEffect, useState, useRef } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
}

export default function LazyImage({ src, alt, className }: LazyImageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
		// eslint-disable-next-line no-undef
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Deja de observar después de cargar
        }
      },
      { threshold: 0.1 } // Se activa cuando el 10% de la imagen es visible
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <img
      className={className}
      ref={imgRef}
      src={isVisible ? src : ''}
      alt={alt}
      width="100%"
      height="auto"
      loading="lazy"
    />
  )
}
