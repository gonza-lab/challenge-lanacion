import React, { AnchorHTMLAttributes } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type LinkProps = AnchorHTMLAttributes<{}>

export default function Link({ className, children, ...props }: LinkProps) {
  return (
    <a {...props} className={className + ' '}>
      {children}
    </a>
  )
}
