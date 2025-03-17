import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App.server'

test('renderiza la página App correctamente', () => {
  render(
    <App
      data={{
        articles: [
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
        ],
        tags: [
          {
            href: '/tema/huevo-tid47236',
            children: 'Huevo',
          },
          {
            href: '/tema/leche-tid47244',
            children: 'Leche',
          },
          {
            href: '/tema/arroz-tid47136',
            children: 'Arroz',
          },
        ],
      }}
    />
  )

  // Validamos que esté el título
  expect(screen.getByText('Acumulado Grilla')).toBeInTheDocument()

	// No validamos que estén los artículos porque eso ya se verifica en otro test

  // Validamos que esté el botón final
  expect(screen.getByText('MÁS NOTAS DE ACUMULADO GRILLA')).toBeInTheDocument()
})
