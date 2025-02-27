'use client'

import { useState, useEffect } from 'react'
import { CalendarIcon, Users2, Ticket, DollarSign, Clock, DiscIcon as Card25, DollarSignIcon as DollarSign2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Bar, BarChart } from 'recharts'
import type { DateRange } from 'react-day-picker'
import { addDays, format } from 'date-fns'
import { es } from 'date-fns/locale'
import { cn, formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface VentasData {
  name: string
  ventas: number
  asistentes: number
  ventasAnteriores?: number
  asistentesAnteriores?: number
}

interface CanalData {
  name: string
  value: number
  total: number
}

interface TooltipProps {
  active: boolean
  payload?: Array<{ payload: VentasData | CanalData }>
  label?: string
}

function VentasTooltip ({ active, payload, label }: TooltipProps): React.JSX.Element | null {
  if (!active || payload?.length === 0) return null

  const ventasData = payload?.[0]?.payload as VentasData
  const crecimientoVentas = ventasData.ventasAnteriores !== undefined && ventasData.ventasAnteriores !== 0
    ? ((ventasData.ventas - ventasData.ventasAnteriores) / ventasData.ventasAnteriores) * 100
    : 0
  const crecimientoAsistentes = ventasData.asistentesAnteriores !== undefined && ventasData.asistentesAnteriores !== 0
    ? ((ventasData.asistentes - ventasData.asistentesAnteriores) / ventasData.asistentesAnteriores) * 100
    : 0

  return (
    <div className='rounded-lg border bg-background p-2 shadow-md'>
      <div className='grid gap-2'>
        <div className='text-sm font-semibold'>{label}</div>
        <div className='grid gap-1'>
          <div className='flex items-center gap-2'>
            <DollarSign2 className='h-4 w-4 text-primary' />
            <span className='text-sm'>Ventas: {formatCurrency(ventasData.ventas)}</span>
            {ventasData.ventasAnteriores !== undefined && ventasData.ventasAnteriores !== 0 && (
              <span className={`text-xs ${crecimientoVentas >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ({crecimientoVentas > 0 ? '+' : ''}
                {crecimientoVentas.toFixed(1)}%)
              </span>
            )}
          </div>
          <div className='flex items-center gap-2'>
            <Users2 className='h-4 w-4 text-primary' />
            <span className='text-sm'>Asistentes: {ventasData.asistentes.toLocaleString()}</span>
            {ventasData.asistentesAnteriores !== undefined && ventasData.asistentesAnteriores !== 0 && (
              <span className={`text-xs ${crecimientoAsistentes >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ({crecimientoAsistentes > 0 ? '+' : ''}
                {crecimientoAsistentes.toFixed(1)}%)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function CanalTooltip ({ active, payload, label }: TooltipProps): React.JSX.Element | null {
  if (!active || payload?.length === 0 || payload === undefined) return null

  const data = payload[0]?.payload as CanalData

  return (
    <div className='rounded-lg border bg-background p-2 shadow-md'>
      <div className='grid gap-2'>
        <div className='text-sm font-semibold'>{label}</div>
        <div className='grid gap-1'>
          <div className='flex items-center gap-2'>
            <Card25 className='h-4 w-4 text-primary' />
            <span className='text-sm'>
              {formatCurrency(data.total * (data.value / 100))} ({data.value}%)
            </span>
          </div>
          <div className='text-xs text-muted-foreground'>
            {(data.total * (data.value / 100)).toLocaleString()} transacciones
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardContent (): React.JSX.Element {
  const [isClient, setIsClient] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date()
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Panel de Control</h1>
        <DateRangePicker date={date} setDate={setDate} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <DashboardCard
          title='Ventas Totales'
          value='$125,430'
          icon={DollarSign}
          description='+15% vs. periodo anterior'
          trend='up'
        />
        <DashboardCard
          title='Entradas Vendidas'
          value='3,721'
          icon={Ticket}
          description='78% de ocupación'
          trend='up'
        />
        <DashboardCard
          title='Asistentes Confirmados'
          value='2,945'
          icon={Users2}
          description='85% de capacidad'
          trend='up'
        />
        <DashboardCard title='Ventas Anticipadas' value='68%' icon={Clock} description='vs. 32% en puerta' trend='up' />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {isClient && <VentasChart />}
        {isClient && <CanalVentasChart />}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <ProximosEventos />
        <ActividadReciente />
      </div>
    </div>
  )
}

function DateRangePicker ({
  date,
  setDate
}: {
  date: DateRange | undefined
  setDate: (date: DateRange | undefined) => void
}): React.JSX.Element {
  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant='outline'
            className={cn('w-[300px] justify-start text-left font-normal', (date == null) && 'text-muted-foreground')}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {((date?.from) != null)
              ? (
                  (date.to != null)
                    ? (
                      <>
                        {format(date.from, "d 'de' MMMM yyyy", { locale: es })} -{' '}
                        {format(date.to, "d 'de' MMMM yyyy", { locale: es })}
                      </>
                      )
                    : (
                        format(date.from, "d 'de' MMMM yyyy", { locale: es })
                      )
                )
              : (
                <span>Selecciona un rango de fechas</span>
                )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface DashboardCardProps {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  trend: 'up' | 'down'
}

function DashboardCard ({
  title,
  value,
  icon: Icon,
  description,
  trend
}: DashboardCardProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        <p className='text-xs text-muted-foreground'>
          {trend === 'up' ? '↑' : '↓'} {description}
        </p>
      </CardContent>
    </Card>
  )
}

function VentasChart (): React.JSX.Element {
  const data: VentasData[] = [
    {
      name: 'Ene',
      ventas: 125000,
      ventasAnteriores: 100000,
      asistentes: 2400,
      asistentesAnteriores: 2000
    },
    {
      name: 'Feb',
      ventas: 165000,
      ventasAnteriores: 125000,
      asistentes: 3200,
      asistentesAnteriores: 2400
    },
    {
      name: 'Mar',
      ventas: 190000,
      ventasAnteriores: 165000,
      asistentes: 3800,
      asistentesAnteriores: 3200
    },
    {
      name: 'Abr',
      ventas: 185000,
      ventasAnteriores: 190000,
      asistentes: 3600,
      asistentesAnteriores: 3800
    },
    {
      name: 'May',
      ventas: 210000,
      ventasAnteriores: 185000,
      asistentes: 4200,
      asistentesAnteriores: 3600
    },
    {
      name: 'Jun',
      ventas: 235000,
      ventasAnteriores: 210000,
      asistentes: 4800,
      asistentesAnteriores: 4200
    }
  ]

  const formatYAxisLeft = (value: number): string => `$${value / 1000}k`
  const formatYAxisRight = (value: number): string => `${value}`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas y Asistentes</CardTitle>
        <CardDescription>Comparativa mensual de ventas y asistencia</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            ventas: {
              label: 'Ventas',
              color: 'hsl(var(--chart-1))'
            },
            asistentes: {
              label: 'Asistentes',
              color: 'hsl(var(--chart-2))'
            }
          }}
          className='h-[300px]'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis yAxisId='left' tickFormatter={formatYAxisLeft} />
              <YAxis yAxisId='right' orientation='right' tickFormatter={formatYAxisRight} />
              <Legend />
              <Line yAxisId='left' type='monotone' dataKey='ventas' stroke='var(--color-ventas)' activeDot={{ r: 8 }} />
              <Line yAxisId='right' type='monotone' dataKey='asistentes' stroke='var(--color-asistentes)' />
              <ChartTooltip content={<VentasTooltip active />} cursor={{ strokeDasharray: '3 3' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function CanalVentasChart (): React.JSX.Element {
  const data: CanalData[] = [
    { name: 'Online', value: 68, total: 5000 },
    { name: 'Offline', value: 32, total: 5000 }
  ]

  const formatYAxis = (value: number): string => `${value}%`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Canales de Venta</CardTitle>
        <CardDescription>Distribución de ventas por canal</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: 'Ventas',
              color: 'hsl(var(--chart-1))'
            }
          }}
          className='h-[300px]'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis tickFormatter={formatYAxis} />
              <Legend />
              <Bar dataKey='value' fill='var(--color-online)' radius={[4, 4, 0, 0]} />
              <ChartTooltip content={<CanalTooltip active />} cursor={{ fill: 'var(--color-online)', opacity: 0.1 }} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function ProximosEventos (): React.JSX.Element {
  const eventos = [
    { nombre: 'Concierto Rock', fecha: '2023-08-15', ventas: 75, lugar: 'Estadio Central' },
    { nombre: 'Festival de Jazz', fecha: '2023-08-22', ventas: 45, lugar: 'Parque Municipal' },
    { nombre: 'Obra de Teatro', fecha: '2023-08-29', ventas: 60, lugar: 'Teatro Nacional' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximos Eventos</CardTitle>
        <CardDescription>Estado de los próximos eventos programados</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Evento</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Ventas</TableHead>
              <TableHead>Lugar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eventos.map((evento) => (
              <TableRow key={evento.nombre}>
                <TableCell className='font-medium'>{evento.nombre}</TableCell>
                <TableCell>{evento.fecha}</TableCell>
                <TableCell>
                  <div className='flex items-center'>
                    <Progress value={evento.ventas} className='w-[60px] mr-2' />
                    <span>{evento.ventas}%</span>
                  </div>
                </TableCell>
                <TableCell>{evento.lugar}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function ActividadReciente (): React.JSX.Element {
  const actividades = [
    { tipo: 'Venta', descripcion: 'Venta de 10 entradas VIP', monto: '$1,500', tiempo: 'Hace 5 min' },
    { tipo: 'Reembolso', descripcion: 'Reembolso por cancelación', monto: '$150', tiempo: 'Hace 1 hora' },
    { tipo: 'Aprobación', descripcion: 'Nuevo evento aprobado', monto: '-', tiempo: 'Hace 2 horas' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>Últimas transacciones y eventos en la plataforma</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Tiempo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actividades.map((actividad) => (
              <TableRow key={actividad.descripcion}>
                <TableCell>
                  <Badge variant={actividad.tipo === 'Reembolso' ? 'destructive' : 'default'}>{actividad.tipo}</Badge>
                </TableCell>
                <TableCell className='font-medium'>{actividad.descripcion}</TableCell>
                <TableCell>{actividad.monto}</TableCell>
                <TableCell>{actividad.tiempo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
