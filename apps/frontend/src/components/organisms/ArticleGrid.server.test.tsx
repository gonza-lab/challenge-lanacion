import React from 'react'
import { render, screen } from '@testing-library/react'
import ArticleGrid from './ArticleGrid.server'
import { ArticleProps } from '../molecules/Article.server'

test('renderiza la grilla de artículos con los datos correctos', () => {
  const articles: ArticleProps[] = [
    {
      title: 'Arroz con Leche',
      image:
        'https://resizer.glanacion.com/resizer/p3oaYfEpZiXQkKOfqHkFKhkcbu4=/0x300/filters:quality(75)/arc-anglerfish-arc2-prod-lanacionar/public/FRS7GJ6XZJCKHDDISLQTRG33UE.jpg',
      date: '6 de diciembre de 2019',
    },
    {
      title: 'NOTA RECETA DE PRUEBA (DO NOT DELETE (Ú.Ú) )',
      image:
        'https://resizer.glanacion.com/resizer/p3oaYfEpZiXQkKOfqHkFKhkcbu4=/0x300/filters:quality(75)/arc-anglerfish-arc2-prod-lanacionar/public/FRS7GJ6XZJCKHDDISLQTRG33UE.jpg',
      date: '3 de diciembre de 2019',
    },
    {
      title: 'Risotto con alcauciles y frutos de mar',
      image:
        'https://resizer.glanacion.com/resizer/S01DKRIeLbicU98vPKONz_V0ACw=/0x300/filters:quality(75)/arc-anglerfish-arc2-prod-lanacionar/public/SE3ZGTPDINCX3LLSPF4PQVTQCI.jpg',
      date: '29 de octubre de 2019',
    },
  ]

  render(<ArticleGrid articles={articles} />)

  expect(screen.getByText('Arroz con Leche')).toBeInTheDocument()
  expect(screen.getByText('NOTA RECETA DE PRUEBA (DO NOT DELETE (Ú.Ú) )')).toBeInTheDocument()
  expect(screen.queryByText('Articulo que no existe')).not.toBeInTheDocument()
})
