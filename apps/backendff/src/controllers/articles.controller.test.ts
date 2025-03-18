import request from 'supertest'
import app from '@/app'

jest.mock('../data/articles.json', () => ({
  articles: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    subtype: '7',
    headlines: { basic: `Artículo ${i + 1}` },
    promo_items: { basic: { url: `https://image${i + 1}.jpg` } },
    display_date: new Date(),
  })),
}))

jest.mock('../utils/articles.util.ts', () => ({
  filterBySubtype: jest.fn((articles) => articles),
  paginateArticles: jest.fn((articles, query) => ({
    page: query.page,
    limit: query.limit,
    totalArticles: articles.length,
    totalPages: Math.ceil(articles.length / query.limit),
    articles: articles,
  })),
}))

describe('GET /api/articles', () => {
  test('articles in response must only contain following properties: title, image and date', async () => {
    const limit = 30
    const page = 1
    const response = await request(app).get(
      `/api/articles?limit=${limit}&page=${page}`
    )

    expect(response.status).toBe(200)

    response.body.articles.forEach(
      (article: Partial<{ title: string; image: string; date: string }>) => {
        expect(article).toHaveProperty('title')
        expect(article).toHaveProperty('image')
        expect(article).toHaveProperty('date')
        expect(Object.keys(article).length).toBe(3)

        expect(article.title).toBeTruthy()
        expect(article.image).toBeTruthy()
        expect(article.date).toBeTruthy()
      }
    )
  })
})
