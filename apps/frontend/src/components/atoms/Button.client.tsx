import React, { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode | string
}

export default function Button({ children }: ButtonProps) {
  return <button className="--btn --secondary">{children}</button>
}
