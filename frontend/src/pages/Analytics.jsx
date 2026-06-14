import { useEffect, useState } from 'react'
import api from '../api/api'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'

export default function Analytics() {

  const [stores, setStores] = useState([])

  useEffect(() => {

    const loadAnalytics = async () => {

      try {

        const response = await api.get(
          '/analytics/store-performance'
        )

        setStores(
          response.data
        )

      } catch (error) {

        console.log(error)

      }
    }

    loadAnalytics()

  }, [])

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="text-slate-500">
          Store Performance Analytics
        </p>
      </div>

      <div className="card p-6">

        <h2 className="text-xl font-semibold mb-6">
          Orders By Store
        </h2>

        <div className="h-96">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart data={stores}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="store_location"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="orders"
                fill="#4F46E5"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  )
}