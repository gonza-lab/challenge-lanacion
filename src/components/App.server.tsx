import React from 'react'
import MainLayout from './templates/MainLayout.server'
import ArticleGrid from './organisms/ArticleGrid.server'
import Typography from './atoms/Typography.server'
import TagList from './molecules/TagList'
import Button from './atoms/Button.client'

export default function App() {
  return (
    <main>
      <MainLayout
        header={
          <>
            <div className="row">
              <div className="com-titleWithfollow hlp-marginBottom-15">
                <Typography
                  className="hlp-marginBottom-40"
                  variant="sectionTitle"
                  as="h1"
                >
                  Acumulado Grilla
                </Typography>
              </div>
            </div>

            <div className="row">
              <TagList
                tags={[
                  { children: 'Platos principales', href: '#' },
                  { children: 'Cerdo', href: '#' },
                  { children: 'Papa', href: '#' },
                  { children: 'Date un gustito', href: '#' },
                  { children: 'La familia', href: '#' },
                ]}
              />
            </div>
          </>
        }
        footer={
          <div className="col-12 hlp-text-center hlp-margintop-40">
            <Button>MÁS NOTAS DE ACUMULADO GRILLA</Button>
          </div>
        }
      >
        <>
          <ArticleGrid
            articles={[
              {
                title: 'El cumpleaños de gonza',
                image: 'foto',
                date: '10 de Noviembre del 2001',
              },
              {
                title: 'El cumpleaños de gonza',
                image: 'foto',
                date: '10 de Noviembre del 2001',
              },
              {
                title: 'El cumpleaños de gonza',
                image: 'foto',
                date: '10 de Noviembre del 2001',
              },
            ]}
          />
        </>
      </MainLayout>
    </main>
  )
}
