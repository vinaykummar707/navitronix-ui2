import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/ui/button'
import { ArrowUpIcon } from 'lucide-react'
import PcbCreationDialog from './dialogs/PcbCreationDialog'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router'
import Layout from './components/layout'
import PcbsPage from './pages/PcbsPage'
import TestingPlayground from './pages/TestingPlayground'
import RouteCreatePage from './pages/RouteCreatePage'

function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
      <Routes>
        {/* Login has no layout */}
        <Route path="/playground" element={<TestingPlayground />} />
        <Route path="/route-create" element={<RouteCreatePage />} />

        {/* Everything else uses the Layout */}
        <Route path="/home" element={<Layout />}>
          <Route index  element={<PcbsPage />} />
        </Route>

        {/* Fallback: redirect unknown routes to login or home */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </Router>
  )
}

export default App
