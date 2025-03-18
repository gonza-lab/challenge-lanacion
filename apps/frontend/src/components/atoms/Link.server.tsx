/*global HTMLAnchorElement*/
import React, { AnchorHTMLAttributes } from 'react'

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export default function Link({ className, children, ...props }: LinkProps) {
  return (
    <a {...props} className={className + ' '}>
      {children}
    </a>
  )
}
