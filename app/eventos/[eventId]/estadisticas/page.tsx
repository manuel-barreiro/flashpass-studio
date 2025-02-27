'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Ene', ventas: 4000, asistentes: 2400 },
  { name: 'Feb', ventas: 3000, asistentes: 1398 },
  { name: 'Mar', ventas: 2000, asistentes: 9800 },
  { name: 'Abr', ventas: 2780, asistentes: 3908 },
  { name: 'May', ventas: 1890, asistentes: 4800 },
  { name: 'Jun', ventas: 2390, asistentes: 3800 }
]

export default function EstadisticasPage (): React.JSX.Element {
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold'>Estadísticas del Evento</h2>

      <Card>
        <CardHeader>
          <CardTitle>Ventas y Asistencia por Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[400px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis yAxisId='left' orientation='left' stroke='#8884d8' />
                <YAxis yAxisId='right' orientation='right' stroke='#82ca9d' />
                <Tooltip />
                <Legend />
                <Bar yAxisId='left' dataKey='ventas' fill='#8884d8' name='Ventas' />
                <Bar yAxisId='right' dataKey='asistentes' fill='#82ca9d' name='Asistentes' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
