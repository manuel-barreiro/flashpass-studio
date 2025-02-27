import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, CalendarIcon, MapPinIcon, TicketIcon, Users2Icon, DollarSign } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

// This would typically come from an API or database
const eventDetails = {
  id: '1',
  title: 'Concierto de Rock',
  date: '15 de agosto, 2023',
  location: 'Estadio Central',
  ticketsSold: 1500,
  totalTickets: 2000,
  tablesSold: 45,
  totalTables: 50,
  revenue: 75000
}

export default function EventSummaryPage (): React.JSX.Element {
  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Entradas Vendidas</CardTitle>
            <TicketIcon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{eventDetails.ticketsSold}</div>
            <Progress value={(eventDetails.ticketsSold / eventDetails.totalTickets) * 100} className='mt-2' />
            <p className='text-xs text-muted-foreground mt-2'>
              {((eventDetails.ticketsSold / eventDetails.totalTickets) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Mesas Reservadas</CardTitle>
            <Users2Icon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{eventDetails.tablesSold}</div>
            <Progress value={(eventDetails.tablesSold / eventDetails.totalTables) * 100} className='mt-2' />
            <p className='text-xs text-muted-foreground mt-2'>
              {((eventDetails.tablesSold / eventDetails.totalTables) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Ingresos Totales</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatCurrency(eventDetails.revenue)}</div>
            <p className='text-xs text-muted-foreground mt-2'>+20.1% del objetivo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Ocupación Total</CardTitle>
            <BarChart className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {(
                ((eventDetails.ticketsSold + eventDetails.tablesSold * 4) /
                  (eventDetails.totalTickets + eventDetails.totalTables * 4)) *
                100
              ).toFixed(1)}
              %
            </div>
            <p className='text-xs text-muted-foreground mt-2'>Basado en entradas y mesas</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles del Evento</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center space-x-2'>
            <CalendarIcon className='h-4 w-4 text-muted-foreground' />
            <span>{eventDetails.date}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <MapPinIcon className='h-4 w-4 text-muted-foreground' />
            <span>{eventDetails.location}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
