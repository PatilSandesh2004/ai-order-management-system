import { useEffect, useMemo, useState } from 'react'
import { PackagePlus, Layers3 } from 'lucide-react'
import api from '../api/api'

export default function Inventory() {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    lens_type: '',
    lens_index: '',
    power: '',
    coating: '',
    quantity: '',
  })

  const loadInventory = async () => {
    try {
      const response = await api.get('/inventory')
      setInventory(response.data)
    } catch {
      setError('Unable to load inventory from the backend.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInventory()
  }, [])

  const stats = useMemo(() => {
    const total = inventory.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
    const lowStock = inventory.filter((item) => Number(item.quantity || 0) <= 10).length
    return { total, lowStock }
  }, [inventory])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await api.post('/inventory', {
        ...formData,
        lens_index: Number(formData.lens_index),
        power: Number(formData.power),
        quantity: Number(formData.quantity),
      })
      setFormData({ lens_type: '', lens_index: '', power: '', coating: '', quantity: '' })
      await loadInventory()
    } catch {
      setError('Unable to create inventory item.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="card flex min-h-[50vh] items-center justify-center text-slate-500">Loading inventory...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">Stock Control</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Inventory</h1>
      </div>

      {error ? <div className="card border-danger/20 p-4 text-danger">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="card p-5">
          <p className="text-sm text-slate-500">Inventory SKUs</p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-900">{inventory.length}</h3>
        </div>
        <div className="card p-5">
          <p className="text-sm text-slate-500">Total Quantity</p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-900">{stats.total}</h3>
        </div>
        <div className="card p-5">
          <p className="text-sm text-slate-500">Low Stock Items</p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-900">{stats.lowStock}</h3>
        </div>
        <div className="card p-5">
          <p className="text-sm text-slate-500">Automation</p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-900">Live</h3>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="card p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <PackagePlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Add Inventory Item</h2>
              <p className="text-sm text-slate-500">Create a new lens stock record</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input className="input-field" name="lens_type" value={formData.lens_type} onChange={handleChange} placeholder="Lens Type" required />
            <input className="input-field" name="lens_index" value={formData.lens_index} onChange={handleChange} placeholder="Lens Index" type="number" step="0.01" required />
            <input className="input-field" name="power" value={formData.power} onChange={handleChange} placeholder="Power" type="number" step="0.25" required />
            <input className="input-field" name="coating" value={formData.coating} onChange={handleChange} placeholder="Coating" required />
            <input className="input-field" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" type="number" required />
            <button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? 'Saving...' : 'Submit Inventory'}
            </button>
          </form>
        </div>

        <div className="card p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-success/10 text-success">
              <Layers3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Inventory Records</h2>
              <p className="text-sm text-slate-500">Current stock and coating matrix</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {['Lens Type', 'Lens Index', 'Power', 'Coating', 'Quantity'].map((heading) => (
                    <th key={heading} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80">
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">{item.lens_type}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{item.lens_index}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{item.power}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{item.coating}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
