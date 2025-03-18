import { filterBySubtype } from './articles.util'
import data from '../data/articles.json'
const articles = data.articles

describe('filterBySubtype util', () => {
  test('filter by subtype provided', () => {
    expect(
      filterBySubtype(articles, '7').every((article) => article.subtype === '7')
    ).toBeTruthy()
  })

  test('filter by non existent subtype must return empty array', () => {
    expect(filterBySubtype(articles, '-1')).toEqual([])
  })

  test('given empty array, filter must return empty array', () => {
    expect(filterBySubtype([], '-1')).toEqual([])
  })

  test('given empty array, filter must return empty array', () => {
    expect(filterBySubtype([], '-1')).toEqual([])
  })

	test('original array must not be modified', () => {
    const copy = [...articles] 
    filterBySubtype(articles, '7')
    expect(articles).toEqual(copy) 
  })
})
