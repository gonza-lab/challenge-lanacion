import React from 'react'
import Article, { ArticleProps } from '../molecules/Article.server'

export default function ArticleGrid({
  articles,
}: {
  articles: ArticleProps[]
}) {
  return (
    <section className="row-gap-tablet-2 row-gap-deskxl-3 hlp-degrade">
      {articles.map((article, index) => (
        <Article key={index} {...article} />
      ))}
    </section>
  )
}
