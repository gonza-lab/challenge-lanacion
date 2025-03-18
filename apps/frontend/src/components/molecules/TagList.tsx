import React from 'react'
import Tag, { TagProps } from '@/components/atoms/Tag.server'

interface TagListProps {
  tags: TagProps[]
}

export default function TagList({ tags }: TagListProps) {
  return (
    <div className="cont_tags hlp-marginBottom-20 com-secondary-tag">
      {tags.map((tag, index) => (
        <Tag key={index} {...tag} />
      ))}
    </div>
  )
}
