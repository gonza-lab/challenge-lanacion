import { cva } from 'class-variance-authority'
import clsx from 'clsx'
import React from 'react'

const typographyVariants = cva('', {
  variants: {
    variant: {
      sectionTitle: 'com-title-section-xl',
      articleTitle: 'com-title-acu',
      date: 'com-date',
    },
  },
  defaultVariants: {
    variant: 'articleTitle',
  },
})

type TypographyProps<T extends React.ElementType> = {
  as?: T
  variant?: 'sectionTitle' | 'articleTitle' | 'date'
} & React.ComponentPropsWithoutRef<T>

function Typography<T extends React.ElementType = 'p'>({
  as,
  variant,
  className,
  ...props
}: TypographyProps<T>) {
  const Component = as || 'p'

  return (
    <Component
      className={clsx(typographyVariants({ variant }), className)}
      {...props}
    />
  )
}

export default Typography
