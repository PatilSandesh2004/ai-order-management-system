import { AlertTriangle, ShieldAlert } from 'lucide-react'

export default function AlertCard({ alert }) {
  const score = Number(alert.risk_score ?? 0)

  return (
    <div className="rounded-3xl border border-danger/20 bg-gradient-to-br from-red-50 to-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-danger/10 text-danger">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-danger/80">High Risk Alert</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">
              {alert.customer_name || 'Unknown Customer'}
            </h3>
          </div>
        </div>
        <ShieldAlert className="h-5 w-5 text-danger" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-white p-3">
          <p className="text-xs text-slate-500">Order ID</p>
          <p className="mt-1 font-semibold text-slate-900">{alert.id ?? alert.order_id ?? 'N/A'}</p>
        </div>
        <div className="rounded-2xl bg-white p-3">
          <p className="text-xs text-slate-500">Status</p>
          <p className="mt-1 font-semibold text-slate-900">{alert.status || 'Pending'}</p>
        </div>
        <div className="rounded-2xl bg-white p-3">
          <p className="text-xs text-slate-500">Risk Score</p>
          <p className="mt-1 font-semibold text-danger">{(score * 100).toFixed(0)}%</p>
        </div>
        <div className="rounded-2xl bg-white p-3">
          <p className="text-xs text-slate-500">Priority</p>
          <p className="mt-1 font-semibold text-danger">Immediate Review</p>
        </div>
      </div>
    </div>
  )
}
