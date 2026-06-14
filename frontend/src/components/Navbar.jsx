import { Bell, Search, Settings2, Menu } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="flex h-24 items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden">
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex flex-1 flex-col">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Welcome back, Sandeep! 👋</h2>
          <p className="text-sm text-slate-600">Here's what&apos;s happening with your orders today.</p>
        </div>

        <label className="hidden w-full max-w-[390px] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-500 shadow-sm xl:flex">
          <Search className="h-4 w-4 shrink-0" />
          <input
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400"
            placeholder="Search orders, customers, lenses..."
            type="search"
          />
        </label>

        <div className="flex items-center gap-4">
          <button className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-5 min-w-5 rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-5 text-white">
              3
            </span>
          </button>

          <button className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm">
            <Settings2 className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 rounded-full bg-white px-2 py-1.5 shadow-sm ring-1 ring-slate-200">
            <div className="relative h-11 w-11 overflow-hidden rounded-full">
              <img
                alt="Admin profile"
                src="https://i.pravatar.cc/100?img=12"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
