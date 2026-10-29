import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/archivo/wdth.css'
import './index.css'
import { App } from './App'
import { routeForPath } from './routes'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App path={location.pathname} />
  </StrictMode>
)

if (root.firstElementChild) {
  hydrateRoot(root, app)
} else {
  // Dev server: pages are not prerendered, so render and set the title here.
  document.title = routeForPath(location.pathname).title
  createRoot(root).render(app)
}
