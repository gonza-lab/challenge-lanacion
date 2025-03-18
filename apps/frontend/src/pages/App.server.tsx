import React from 'react'
import MainLayout from '@/components/templates/MainLayout.server'
import ArticleGrid from '@/components/organisms/ArticleGrid.server'
import Typography from '@/components/atoms/Typography.server'
import TagList from '@/components/molecules/TagList'
import Button from '@/components/atoms/Button.client'
import { ArticleProps } from '@/components/molecules/Article.server'
import { TagProps } from '@/components/atoms/Tag.server'
import { CONFIG } from '@/config/env'
import qs from 'qs'

interface AppProps {
  data: {
    articles: ArticleProps[]
    tags: TagProps[]
  }
}

export async function getData({ page = 1, limit = 10 }) {
  const [resArticles, resTags] = await Promise.all([
    fetch(`${CONFIG.BACKENDFF_URL}/articles?${qs.stringify({ page, limit })}`),
    fetch(`${CONFIG.BACKENDFF_URL}/tags`),
  ])

  if (!resArticles.ok || !resTags.ok) {
    throw new Error(
      `Failed to fetch: Articles(${resArticles.status}), Tags(${resTags.status})`
    )
  }

  const [articlesData, tagsData] = await Promise.all([
    resArticles.json(),
    resTags.json(),
  ])

  return {
    articles: articlesData.articles,
    tags: tagsData.tags,
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
