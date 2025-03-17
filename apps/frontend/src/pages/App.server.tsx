import React from 'react'
import MainLayout from '../components/templates/MainLayout.server'
import ArticleGrid from '../components/organisms/ArticleGrid.server'
import Typography from '../components/atoms/Typography.server'
import TagList from '../components/molecules/TagList'
import Button from '../components/atoms/Button.client'
import { ArticleProps } from '../components/molecules/Article.server'
import { TagProps } from '../components/atoms/Tag.server'

interface AppProps {
  data: {
    articles: ArticleProps[]
    tags: TagProps[]
  }
}

export default function App({ data }: AppProps) {
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
              <TagList tags={data.tags} />
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
          <ArticleGrid articles={data.articles} />
        </>
      </MainLayout>
    </main>
  )
}
