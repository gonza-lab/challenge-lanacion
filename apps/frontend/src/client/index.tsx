import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from '../components/App.server'

const container = document.getElementById('root')

if (container) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialData = (window as any).__INITIAL_DATA__
  hydrateRoot(container, <App articles={initialData} />)
}
