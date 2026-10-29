import { Layout } from './components/Layout'
import { routeForPath, type RouteId } from './routes'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ServicesPage } from './pages/ServicesPage'
import { ContactPage } from './pages/ContactPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { CreditsPage } from './pages/CreditsPage'
import { NotFoundPage } from './pages/NotFoundPage'

const pages: Record<RouteId, () => React.JSX.Element> = {
  home: HomePage,
  about: AboutPage,
  services: ServicesPage,
  contact: ContactPage,
  privacy: PrivacyPage,
  credits: CreditsPage,
  notFound: NotFoundPage,
}

export function App({ path }: { path: string }) {
  const route = routeForPath(path)
  const Page = pages[route.id]
  return (
    <Layout routeId={route.id}>
      <Page />
    </Layout>
  )
}
