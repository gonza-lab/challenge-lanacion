import { Article } from '@/types/Article.type'
import { getTopTags } from '@/utils/tag.util'

// Mock de artículos con tags repetidos para probar el conteo
const mockArticles: Article[] = [
  {
    _id: '1',
    display_date: '2025-03-17T12:00:00Z',
    headlines: { basic: 'Artículo 1' },
    promo_items: undefined,
    subtype: 'news',
    taxonomy: {
      tags: [
        { name: 'Tech', slug: 'tech', text: 'Tech' },
        { name: 'Science', slug: 'science', text: 'Science' },
      ],
    },
    website_url: '/article-1',
  },
  {
    _id: '2',
    display_date: '2025-03-17T12:30:00Z',
    headlines: { basic: 'Artículo 2' },
    promo_items: undefined,
    subtype: 'news',
    taxonomy: {
      tags: [
        { name: 'Tech', slug: 'tech', text: 'Tech' },
        { name: 'AI', slug: 'ai', text: 'AI' },
      ],
    },
    website_url: '/article-2',
  },
  {
    _id: '3',
    display_date: '2025-03-17T13:00:00Z',
    headlines: { basic: 'Artículo 3' },
    promo_items: undefined,
    subtype: 'news',
    taxonomy: {
      tags: [
        { name: 'Tech', slug: 'tech', text: 'Tech' },
        { name: 'Science', slug: 'science', text: 'Science' },
      ],
    },
    website_url: '/article-3',
  },
]

describe('getTopTagsUtil util', () => {
  test('should return the most frequent tags in order of appearance', () => {
    const result = getTopTags(mockArticles)

    expect(result).toEqual([
      { name: 'Tech', slug: 'tech', text: 'Tech' }, 
      { name: 'Science', slug: 'science', text: 'Science' }, 
      { name: 'AI', slug: 'ai', text: 'AI' }, 
    ])
  })

  test('should limit response size', () => {
    const result = getTopTags(mockArticles, 2) 
    expect(result.length).toBe(2)
    expect(result).toEqual([
      { name: 'Tech', slug: 'tech', text: 'Tech' },
      { name: 'Science', slug: 'science', text: 'Science' },
    ])
  })

  test('if array is empty, function should return empty array', () => {
    const result = getTopTags([])
    expect(result).toEqual([])
  })
})
