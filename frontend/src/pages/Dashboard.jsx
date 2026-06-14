import { useEffect, useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts'
import { AlertTriangle, CheckCircle2, Clock3, ShoppingCart } from 'lucide-react'
import api from '../api/api'
import StatCard from '../components/StatCard'
import OrderTable from '../components/OrderTable'
import AlertCard from '../components/AlertCard'

const statusColors = ['#4F46E5', '#22C55E', '#F59E0B', '#EF4444']
const riskColors = ['#22C55E', '#F59E0B', '#EF4444']

function formatRiskData(data) {
  if (data?.risk_distribution?.length) return data.risk_distribution
  return [
    { name: 'Low Risk', value: Math.max(0, data.total_orders - data.high_risk_orders - data.active_orders) },
    { name: 'Medium Risk', value: data.active_orders },
    { name: 'High Risk', value: data.high_risk_orders },
  ]
}

export default function Dashboard() {
  const [data, setData] = useState({
  total_orders: 0,
  active_orders: 0,
  delivered_orders: 0,
  high_risk_orders: 0,
  low_stock_items: 0,
  sla_breached_orders: 0,
  recent_orders: [],
  status_distribution: [],
  risk_distribution: [],
  alerts: [],
})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await api.get('/dashboard')
        setData(response.data)
      } catch {
        setError('Unable to load dashboard data. Confirm the backend is running on http://localhost:8000.')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const statusData = useMemo(() => {
    if (data.status_distribution?.length) return data.status_distribution
    return [
      { name: 'Order Placed', value: data.total_orders * 0.21 || 25 },
      { name: 'Lens Cutting', value: data.active_orders * 0.3 || 35 },
      { name: 'Polishing', value: data.active_orders * 0.2 || 20 },
      { name: 'Delivered', value: data.delivered_orders || 10 },
    ]
  }, [data])

  const riskData = useMemo(() => formatRiskData(data), [data])

  const alerts = data.alerts?.length
    ? data.alerts
    : (data.recent_orders || [])
        .filter((order) => Number(order.risk_score ?? 0) >= 0.75)
        .slice(0, 3)

  const trendData = [
    { name: 'May 7', risk: 30 },
    { name: 'May 8', risk: 50 },
    { name: 'May 9', risk: 38 },
    { name: 'May 10', risk: 55 },
    { name: 'May 11', risk: 47 },
    { name: 'May 12', risk: 68 },
    { name: 'May 13', risk: 92 },
  ]

  if (loading) {
    return <div className="card flex min-h-[60vh] items-center justify-center text-slate-500">Loading dashboard...</div>
  }

  if (error) {
    return <div className="card border-danger/20 p-6 text-danger">{error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">

  <StatCard
    title="Total Orders"
    value={data.total_orders}
    icon={ShoppingCart}
    accent="primary"
  />

  <StatCard
    title="Active Orders"
    value={data.active_orders}
    icon={Clock3}
    accent="warning"
  />

  <StatCard
    title="Delivered"
    value={data.delivered_orders}
    icon={CheckCircle2}
    accent="success"
  />

  <StatCard
    title="High Risk"
    value={data.high_risk_orders}
    icon={AlertTriangle}
    accent="danger"
  />

  <StatCard
    title="Low Stock"
    value={data.low_stock_items || 0}
    icon={AlertTriangle}
    accent="warning"
  />

  <StatCard
    title="SLA Breach"
    value={data.sla_breached_orders || 0}
    icon={AlertTriangle}
    accent="danger"
  />

</div>

      <div className="grid gap-6 xl:grid-cols-[1.8fr_0.9fr_1fr]">
        <div className="card p-6 xl:col-span-1">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">SLA Risk Trend</h2>
              <p className="text-sm text-slate-500">Risk score trend of orders (Last 7 Days)</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
              Last 7 Days
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#F43F5E" stopOpacity={0.06} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="risk" stroke="#4F46E5" strokeWidth={3} fill="url(#riskGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Risk Distribution</h2>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} paddingAngle={4}>
                  {riskData.map((entry, index) => (
                    <Cell key={entry.name} fill={riskColors[index % riskColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">High Risk Alerts</h2>
            <span className="text-sm font-medium text-primary">View All</span>
          </div>
          <div className="space-y-4">
            {(alerts.length ? alerts : (data.recent_orders || []).slice(0, 3)).map((alert) => (
              <AlertCard key={alert.id ?? alert.order_id} alert={alert} />
            ))}
          </div>
          <button className="btn-secondary mt-5 w-full">View All Alerts</button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <div className="card p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
            </div>
            <span className="text-sm font-medium text-primary">View All Orders</span>
          </div>
          <OrderTable orders={data.recent_orders || []} />
        </div>

        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Orders by Status</h2>
            <span className="text-sm font-medium text-primary">View Report</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={65} outerRadius={100} paddingAngle={3}>
                  {statusData.map((entry, index) => (
                    <Cell key={entry.name} fill={statusColors[index % statusColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
