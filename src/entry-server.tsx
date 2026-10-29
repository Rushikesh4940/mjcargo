import { renderToString } from 'react-dom/server'
import { App } from './App'

export { routes } from './routes'
export { buildHead } from './lib/head'

export function render(path: string) {
  return renderToString(<App path={path} />)
}
