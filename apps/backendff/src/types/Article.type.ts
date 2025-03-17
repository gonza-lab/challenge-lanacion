import { Tag } from './Tag.type'

// generated with https://app.quicktype.io/
export interface Article {
  _id: string
  display_date: string
  headlines: Headlines
  promo_items?: PromoItems
  subtype: string
  taxonomy: Taxonomy
  website_url: string
}

export interface Headlines {
  basic: string
}

export interface PromoItems {
  basic: Basic
}

export interface Basic {
  resized_urls?: ResizedURL[]
  subtitle?: string
  type: string
  url?: string
}

export interface ResizedURL {
  option: Option
  resizedUrl: string
}

export interface Option {
  media: string
}

export interface Taxonomy {
  tags: Tag[]
}