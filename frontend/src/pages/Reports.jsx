import { useEffect, useState } from 'react'
import api from '../api/api'

export default function Reports() {

  const [report, setReport] = useState(null)

  useEffect(() => {

    const loadReport = async () => {
      try {

        const response = await api.get(
          '/reports/orders'
        )

        setReport(
          response.data
        )

      } catch (error) {
        console.log(error)
      }
    }

    loadReport()

  }, [])

  if (!report) {
    return (
      <div className="card p-6">
        Loading Reports...
      </div>
    )
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Reports Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Business Analytics Summary
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

        <div className="card p-6">
          <h3 className="text-sm text-slate-500">
            Total Orders
          </h3>

          <p className="text-4xl font-bold mt-2">
            {report.total_orders}
          </p>
        </div>

        <div className="card p-6">
          <h3 className="text-sm text-slate-500">
            Active Orders
          </h3>

          <p className="text-4xl font-bold mt-2">
            {report.active_orders}
          </p>
        </div>

        <div className="card p-6">
          <h3 className="text-sm text-slate-500">
            Delivered Orders
          </h3>

          <p className="text-4xl font-bold mt-2">
            {report.delivered_orders}
          </p>
        </div>

        <div className="card p-6">
          <h3 className="text-sm text-slate-500">
            High Risk Orders
          </h3>

          <p className="text-4xl font-bold mt-2 text-red-500">
            {report.high_risk_orders}
          </p>
        </div>

        <div className="card p-6">
          <h3 className="text-sm text-slate-500">
            SLA Breaches
          </h3>

          <p className="text-4xl font-bold mt-2 text-orange-500">
            {report.sla_breached_orders}
          </p>
        </div>

      </div>

    </div>
  )
}