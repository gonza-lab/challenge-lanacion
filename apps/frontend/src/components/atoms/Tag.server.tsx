import React, { ReactNode } from 'react'
import Link from '@/components/atoms/Link.server'

export interface TagProps {
  children: ReactNode | string
  href: string
}

export default function Tag({ children, href }: TagProps) {
  return (
    <Link href={href} className="tag">
      {children}
    </Link>
  )
}
