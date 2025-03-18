import React, { ReactNode } from 'react'
import Typography from '@/components/atoms/Typography.server'
import LazyImage from '../atoms/LazyImage.client'

export interface ArticleProps {
  title: string | ReactNode
  date: string
  image: string
}

export default function Article({ title, image, date }: ArticleProps) {
  return (
    <article className="mod-caja-nota living w-100-mobile">
      <section id="" className="cont-figure">
        <a href="" className="figure">
          <picture id="" className="content-pic picture">
            <LazyImage src={image} alt="" className="content-img" />
          </picture>
        </a>
      </section>
      <div className="mod-caja-nota__descrip lugares">
        <Typography variant="articleTitle" as="h2">
          <a href="">{title}</a>
        </Typography>
        <Typography variant="date" as="h4">
          {date}
        </Typography>
      </div>
    </article>
  )
}
