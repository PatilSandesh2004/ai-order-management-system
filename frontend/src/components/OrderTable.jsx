import { Eye, PencilLine } from 'lucide-react'

const statusClasses = {
  'Order Placed': 'bg-blue-100 text-blue-700',
  'Lens Cutting': 'bg-indigo-100 text-indigo-700',
  Polishing: 'bg-violet-100 text-violet-700',
  Coating: 'bg-orange-100 text-orange-700',
  'Quality Check': 'bg-cyan-100 text-cyan-700',
  Delivered: 'bg-emerald-100 text-emerald-700',
  Processing: 'bg-indigo-100 text-indigo-700',
  Shipped: 'bg-sky-100 text-sky-700',
  Delayed: 'bg-red-100 text-red-700',
}

const predictionClasses = {
  'Low Risk': 'bg-emerald-100 text-emerald-700',
  'Medium Risk': 'bg-yellow-100 text-yellow-700',
  'High Risk': 'bg-red-100 text-red-700',
}

export default function OrderTable({ orders = [], onUpdateStatus }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="border-b border-slate-200 bg-slate-50/80">
            <tr>
              {[
                'Order ID',
                'Customer Name',
                'Store Location',
                'Status',
                'Lens Type',
                'Prediction',
                'Risk Score',
                'Action',
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-4 text-left text-sm font-medium text-slate-500"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const score = Number(
                  order.risk_score ?? 0
                )

                const status =
                  order.status ||
                  'Order Placed'

                const prediction =
                  order.prediction ||
                  'Low Risk'

                return (
                  <tr
                    key={
                      order.id ??
                      order.order_id
                    }
                    className="hover:bg-slate-50/70"
                  >
                    <td className="whitespace-nowrap px-6 py-5 text-sm font-semibold text-slate-900">
                      #
                      {order.id ??
                        order.order_id ??
                        'N/A'}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-700">
                      {order.customer_name ||
                        'Unknown'}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-700">
                      {order.store_location ||
                        '—'}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5">
                      <span
                        className={`rounded-lg px-3 py-1 text-sm font-medium ${
                          statusClasses[
                            status
                          ] ||
                          'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-700">
                      {order.lens_type ||
                        '—'}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5">
                      <span
                        className={`rounded-lg px-3 py-1 text-sm font-medium ${
                          predictionClasses[
                            prediction
                          ] ||
                          'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {prediction}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm font-semibold">
                      <span
                        className={
                          score >= 70
                            ? 'text-red-600'
                            : score >= 40
                            ? 'text-orange-500'
                            : 'text-emerald-600'
                        }
                      >
                        {score.toFixed(2)}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50"
                          title="View Order"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {onUpdateStatus ? (
                          <button
                            type="button"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50"
                            title="Update Status"
                            onClick={() => onUpdateStatus(order)}
                          >
                            <PencilLine className="h-4 w-4" />
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>

        </table>
      </div>
    </div>
  )
}
