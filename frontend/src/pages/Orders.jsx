import { useEffect, useMemo, useState } from 'react'
import { Search, SlidersHorizontal, PlusCircle, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import OrderTable from '../components/OrderTable'

export default function Orders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [storeLocation, setStoreLocation] = useState('All')
  const [lensType, setLensType] = useState('All')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [updateStatusValue, setUpdateStatusValue] = useState('Lens Cutting')
  const [delayReason, setDelayReason] = useState('')
  const [updateMessage, setUpdateMessage] = useState('')
  const [updateError, setUpdateError] = useState('')

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await api.get('/orders')
        setOrders(response.data)
      } catch {
        // Keep the page usable even if the backend is temporarily unavailable.
        setOrders([])
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

  const handleOpenStatusDialog = (order) => {
    setSelectedOrder(order)
    setUpdateStatusValue(order.status || 'Lens Cutting')
    setDelayReason('')
    setUpdateMessage('')
    setUpdateError('')
  }

  const handleStatusUpdate = async (event) => {
    event.preventDefault()
    if (!selectedOrder) return

    setUpdateMessage('')
    setUpdateError('')

    try {
      await api.put(`/orders/${selectedOrder.id ?? selectedOrder.order_id}/status`, {
        status: updateStatusValue,
        delay_reason: delayReason,
      })

      setUpdateMessage(`Order #${selectedOrder.id ?? selectedOrder.order_id} updated successfully.`)
      const refreshed = await api.get('/orders')
      setOrders(refreshed.data)
      setTimeout(() => setSelectedOrder(null), 700)
    } catch {
      setUpdateError('Unable to update order status. Please check backend availability.')
    }
  }

  if (loading) {
    return <div className="card flex min-h-[50vh] items-center justify-center text-slate-500">Loading orders...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">Order Lifecycle</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Orders</h1>
        <p className="text-sm text-slate-500">View and filter orders, or create a new one from the order intake page.</p>
      </div>

      <div className="card p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="grid gap-4 xl:flex-1 xl:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
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

          <button
            type="button"
            onClick={() => navigate('/orders/new')}
            className="btn-primary inline-flex items-center justify-center gap-2 xl:w-auto"
          >
            <PlusCircle className="h-4 w-4" />
            Create New Order
          </button>
        </div>
      </div>

      <OrderTable orders={filteredOrders} onUpdateStatus={handleOpenStatusDialog} />

      {selectedOrder ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">Update Status</p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                  Order #{selectedOrder.id ?? selectedOrder.order_id}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedOrder.customer_name} {selectedOrder.store_location ? `- ${selectedOrder.store_location}` : ''}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {updateMessage ? (
              <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {updateMessage}
              </div>
            ) : null}

            {updateError ? (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {updateError}
              </div>
            ) : null}

            <form className="space-y-4" onSubmit={handleStatusUpdate}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">New Status</label>
                <select
                  className="input-field"
                  value={updateStatusValue}
                  onChange={(e) => setUpdateStatusValue(e.target.value)}
                >
                  {[
                    'Order Placed',
                    'Lens Cutting',
                    'Polishing',
                    'Coating',
                    'Quality Check',
                    'Delivered',
                    'Processing',
                    'Shipped',
                    'Delayed',
                  ].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Delay Reason</label>
                <textarea
                  className="input-field min-h-28"
                  placeholder="Optional reason for delay or status change"
                  value={delayReason}
                  onChange={(e) => setDelayReason(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}
