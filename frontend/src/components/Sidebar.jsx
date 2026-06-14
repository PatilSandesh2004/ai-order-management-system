import { LayoutDashboard, ShoppingCart, Package, BellRing, Boxes, FileBarChart2, Settings, LineChart, ChevronDown } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Alerts', href: '/alerts', icon: BellRing },
  { name: 'Analytics', href: '/analytics', icon: LineChart },
  { name: 'Settings', href: '/dashboard', icon: Settings },
  {
  name: 'Reports',
  href: '/reports',
  icon: FileBarChart2,
}

]

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col overflow-hidden border-r border-slate-800/80 bg-[#071124] text-slate-100 lg:flex">
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-950/30">
          <Boxes className="h-6 w-6" />
        </div>
        <div>
          <p className="text-base font-semibold text-white">AI OMS</p>
          <h1 className="text-xs text-slate-400">Order Management System</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-900/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {item.name}
                {item.name === 'Alerts' ? (
                  <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                    3
                  </span>
                ) : null}
              </NavLink>
            )
          })}
        </div>
      </nav>

      <div className="border-t border-white/10 px-4 py-5">
        <div className="flex items-center gap-3 rounded-3xl bg-white/5 px-3 py-3">
          <div className="h-11 w-11 overflow-hidden rounded-full bg-slate-200">
            <img
              alt="Admin"
              src="https://i.pravatar.cc/100?img=12"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Sandeep Patil</p>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
          <ChevronDown className="ml-auto h-4 w-4 text-slate-400" />
        </div>
      </div>
    </aside>
  )
}
