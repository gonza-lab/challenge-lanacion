import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from '@/pages/App.server'
import About from '@/pages/About.server'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const routes: Record<string, React.FC<{data: any}>> = {
  '/': App,
  '/about': About,
}

const container = document.getElementById('root')

if (container) {
  const path = window.location.pathname
  const Component = routes[path]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hydrateRoot(container, <Component data={(window as any).__INITIAL_DATA__} />)
}
