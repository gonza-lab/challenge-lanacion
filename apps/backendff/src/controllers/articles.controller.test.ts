import request from 'supertest'
import app from '../app'

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
}))

describe('GET /api/articles', () => {
  test('controller must be limit response', async () => {
    const limit = 30
    const response = await request(app).get(`/api/articles?limit=${limit}`)

    expect(response.status).toBe(200)
    expect(response.body.articles.length).toBeLessThanOrEqual(limit)
  })

  test('articles in response must only contain following properties: title, image and date', async () => {
    const limit = 30
    const response = await request(app).get('/api/articles?limit=' + limit)

    expect(response.status).toBe(200)
    expect(response.body.articles.length).toBe(limit)

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
