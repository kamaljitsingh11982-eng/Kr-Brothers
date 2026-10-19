import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import SiteShell from './components/SiteShell'
import Home from './pages/Home'

// Only visitors who ask for a page pay for that page's content and its copy.
// Keeps the homepage bundle lean.
const ServicePage = lazy(() => import('./pages/ServicePage'))
const EquipmentPage = lazy(() => import('./pages/EquipmentPage'))
const ServiceAreasPage = lazy(() => import('./pages/ServiceAreasPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteFallback() {
  return (
    <main className="container-kr py-28" aria-busy="true">
      <p className="text-center text-sm font-semibold uppercase tracking-widest text-navy-500">
        Loading…
      </p>
    </main>
  )
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<SiteShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/services/:serviceId/" element={<ServicePage />} />
          {/* Keep these four paths in step with secondaryNavigation in the
              config, sitemap.xml and the prerender route list. */}
          <Route path="/equipment/" element={<EquipmentPage />} />
          <Route path="/service-areas/" element={<ServiceAreasPage />} />
          <Route path="/contact/" element={<ContactPage />} />
          <Route path="/terms/" element={<TermsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}