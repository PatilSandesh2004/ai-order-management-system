import { useState } from 'react'
import { ArrowLeft, PlusCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function CreateOrder() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const lensTypes = ['Single Vision', 'Progressive', 'High Index', 'Bifocal']
  const lensIndexes = ['1.50', '1.56', '1.60', '1.67', '1.74']
  const coatings = ['Blue Cut', 'Anti Glare', 'UV Protection', 'Photochromic']
  const frameTypes = ['Full Rim', 'Half Rim', 'Rimless', 'Sports', 'Aviator']
  const storeLocations = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai']
  const [formData, setFormData] = useState({
    customer_name: '',
    store_location: '',
    lens_type: '',
    lens_index: '',
    power: '',
    coating: '',
    frame_type: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const response = await api.post('/orders', {
        ...formData,
        lens_index: Number(formData.lens_index),
        power: Number(formData.power),
      })

      setSuccess(`Order #${response.data.order_id} created successfully.`)
      setTimeout(() => navigate('/orders'), 900)
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        'Unknown error'
      setError(`Unable to create order: ${detail}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">Order Intake</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Create New Order</h1>
          <p className="text-sm text-slate-500">Enter the eyewear requirements and submit the order to the backend.</p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/orders')}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </button>
      </div>

      {error ? <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
      {success ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

      <div className="card p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <PlusCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Order Requirements</h2>
            <p className="text-sm text-slate-500">Fill all fields to create a new order</p>
          </div>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Customer Name</label>
            <input className="input-field" name="customer_name" value={formData.customer_name} onChange={handleChange} placeholder="Customer name" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Store Location</label>
            <select className="input-field" name="store_location" value={formData.store_location} onChange={handleChange} required>
              <option value="">Select store location</option>
              {storeLocations.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Lens Type</label>
            <select className="input-field" name="lens_type" value={formData.lens_type} onChange={handleChange} required>
              <option value="">Select lens type</option>
              {lensTypes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Lens Index</label>
            <select className="input-field" name="lens_index" value={formData.lens_index} onChange={handleChange} required>
              <option value="">Select lens index</option>
              {lensIndexes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Power</label>
            <input className="input-field" name="power" value={formData.power} onChange={handleChange} placeholder="-2.50" type="number" step="0.25" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Coating</label>
            <select className="input-field" name="coating" value={formData.coating} onChange={handleChange} required>
              <option value="">Select coating</option>
              {coatings.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Frame Type</label>
            <select className="input-field" name="frame_type" value={formData.frame_type} onChange={handleChange} required>
              <option value="">Select frame type</option>
              {frameTypes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? 'Creating Order...' : 'Submit Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
