import { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react'
import api from '../api/api'
import AlertCard from '../components/AlertCard'

export default function Alerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const response = await api.get('/alerts')
        setAlerts(response.data)
      } catch {
        setError('Unable to load alerts from the backend.')
      } finally {
        setLoading(false)
      }
    }

    loadAlerts()
  }, [])

  if (loading) {
    return <div className="card flex min-h-[50vh] items-center justify-center text-slate-500">Loading alerts...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-danger">Breach Monitoring</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Alerts</h1>
      </div>

      {error ? <div className="card border-danger/20 p-4 text-danger">{error}</div> : null}

      {alerts.length === 0 ? (
        <div className="card flex min-h-64 flex-col items-center justify-center px-6 py-10 text-center">
          <AlertCircle className="h-10 w-10 text-success" />
          <h2 className="mt-4 text-xl font-semibold text-slate-900">No high-risk alerts</h2>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            The current backend response does not contain any orders flagged as high risk.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {alerts.map((alert) => (
            <AlertCard key={alert.id ?? alert.order_id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  )
}
