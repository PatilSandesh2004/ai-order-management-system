import { useEffect, useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import api from '../api/api'
import OrderTable from '../components/OrderTable'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [storeLocation, setStoreLocation] = useState('All')
  const [lensType, setLensType] = useState('All')

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await api.get('/orders')
        setOrders(response.data)
      } catch (err) {
        setError('Unable to load orders from the backend.')
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  const filters = useMemo(() => {
    const statuses = [...new Set(orders.map((order) => order.status).filter(Boolean))]
    const stores = [...new Set(orders.map((order) => order.store_location).filter(Boolean))]
    const lenses = [...new Set(orders.map((order) => order.lens_type).filter(Boolean))]
    return { statuses, stores, lenses }
  }, [orders])

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const haystack = [order.customer_name, order.store_location, order.lens_type, order.status]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      const matchesSearch = haystack.includes(search.toLowerCase())
      const matchesStatus = status === 'All' || order.status === status
      const matchesStore = storeLocation === 'All' || order.store_location === storeLocation
      const matchesLens = lensType === 'All' || order.lens_type === lensType
      return matchesSearch && matchesStatus && matchesStore && matchesLens
    })
  }, [lensType, orders, search, status, storeLocation])

  if (loading) {
    return <div className="card flex min-h-[50vh] items-center justify-center text-slate-500">Loading orders...</div>
  }

  if (error) {
    return <div className="card border-danger/20 p-6 text-danger">{error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">Order Lifecycle</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Orders</h1>
      </div>

      <div className="card p-5">
        <div className="grid gap-4 xl:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400"
              placeholder="Search customers, stores, lens types..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            {filters.statuses.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select className="input-field" value={storeLocation} onChange={(e) => setStoreLocation(e.target.value)}>
            <option>All</option>
            {filters.stores.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <div className="relative">
            <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select className="input-field pl-10" value={lensType} onChange={(e) => setLensType(e.target.value)}>
              <option>All</option>
              {filters.lenses.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <OrderTable orders={filteredOrders} />
    </div>
  )
}
