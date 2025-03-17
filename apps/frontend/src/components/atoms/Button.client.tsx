import React, { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode | string
	onClick?: () => void
}

export default function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick} className="--btn --secondary">{children}</button>
}
