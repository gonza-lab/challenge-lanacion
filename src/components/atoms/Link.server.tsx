import React, { AnchorHTMLAttributes } from 'react'

type LinkProps = AnchorHTMLAttributes<{}>

export default function Link({ className, children, ...props }: LinkProps) {
  return (
    <a {...props} className={className + ' '}>
      {children}
    </a>
  )
}
