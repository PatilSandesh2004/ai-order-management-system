import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, Boxes } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.15),_transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(15,23,42,0.7),rgba(15,23,42,0.92))]" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="hidden flex-col justify-between p-10 text-white lg:flex">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/25 text-primary">
                  <Boxes className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">AI OMS</p>
                  <h1 className="text-2xl font-semibold">Order Intelligence Platform</h1>
                </div>
              </div>

              <h2 className="mt-14 max-w-xl text-5xl font-semibold leading-tight">
                Make every order, inventory item, and SLA decision visible in one place.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-slate-300">
                A production-style operations dashboard for order lifecycle tracking, inventory control,
                and AI-driven breach prediction.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                'Real-time order visibility',
                'Inventory tracking',
                'AI risk prediction',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <ShieldCheck className="h-5 w-5 text-success" />
                  <p className="mt-3 text-sm text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="glass-card border-white/20 bg-white/15 p-8 text-white shadow-none">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-100">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI OMS Login
                </div>
                <h3 className="mt-5 text-3xl font-semibold">Welcome back</h3>
                <p className="mt-2 text-sm text-slate-300">Sign in with any credentials to enter the dashboard.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
                  <input className="input-field" type="email" placeholder="admin@aioms.com" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">Password</label>
                  <input className="input-field" type="password" placeholder="Enter any password" required />
                </div>

                <button type="submit" className="btn-primary mt-2 w-full gap-2">
                  Login to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
