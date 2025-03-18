import request from 'supertest'
import app from '../app'
import { ReactNode } from 'react'

jest.mock('../utils/articles.util.ts', () => ({
  getTopTags: jest.fn((articles) => articles),
}))

describe('GET /api/tags', () => {
  test('tags in response must only contain following properties: href, children', async () => {
    const response = await request(app).get('/api/tags')

    expect(response.status).toBe(200)

    response.body.tags.forEach(
      (tag: Partial<{ href: string; children: ReactNode }>) => {
        expect(tag).toHaveProperty('href')
        expect(tag).toHaveProperty('children')
        expect(Object.keys(tag).length).toBe(2)

        expect(tag.href).toBeTruthy()
        expect(tag.children).toBeTruthy()
      }
    )
  })
})
