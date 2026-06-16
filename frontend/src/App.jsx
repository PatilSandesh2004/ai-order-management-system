import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Reports from './pages/Reports'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import CreateOrder from './pages/CreateOrder'
import Inventory from './pages/Inventory'
import Alerts from './pages/Alerts'
import Analytics from './pages/Analytics'
import Chat from './pages/Chat'
function AppShell({ children }) {
  const location = useLocation()

  const hideShell =
    location.pathname === '/' ||
    location.pathname === '/login'

  if (hideShell) {
    return children
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="lg:ml-72">
        <Navbar />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/new" element={<CreateOrder />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/chat" element={<Chat />} />
        <Route
            path="/reports"
            element={<Reports />}
          />
        <Route
            path="/analytics"
            element={<Analytics />}
          />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </AppShell>
  )
}
