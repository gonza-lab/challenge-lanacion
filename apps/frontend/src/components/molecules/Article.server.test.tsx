import React from 'react'
import { render, screen } from '@testing-library/react'
import Article, { ArticleProps } from './Article.server'

describe('Article component tests', () => {
  test('article is rendered with title and date', () => {
    const data: ArticleProps = {
      title: 'Test title',
      date: 'Test date',
      image: 'https://imagetest.com',
    }
    render(<Article {...data} />)

    expect(screen.getByText('Test title')).toBeInTheDocument()
    expect(screen.getByText('Test date')).toBeInTheDocument()
  })
})
