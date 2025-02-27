import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CalendarIcon, MapPinIcon, TicketIcon } from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

interface EventCardProps {
  id: string
  title: string
  date: string
  location: string
  ticketsSold: number
  totalTickets: number
  tablesSold: number
  totalTables: number
  revenue: number
  status: 'upcoming' | 'ongoing' | 'past'
}

export function EventCard ({
  id,
  title,
  date,
  location,
  ticketsSold,
  totalTickets,
  tablesSold,
  totalTables,
  revenue,
  status
}: EventCardProps) {
  const ticketPercentage = (ticketsSold / totalTickets) * 100
  const tablePercentage = (tablesSold / totalTables) * 100

  return (
    <Card className='hover:shadow-lg transition-shadow'>
      <CardHeader>
        <div className='flex justify-between items-start'>
          <CardTitle className='text-xl font-bold'>{title}</CardTitle>
          <Badge variant={status === 'upcoming' ? 'default' : status === 'ongoing' ? 'secondary' : 'outline'}>
            {status === 'upcoming' ? 'Próximo' : status === 'ongoing' ? 'En curso' : 'Pasado'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
          <CalendarIcon className='h-4 w-4' />
          <span>{date}</span>
        </div>
        <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
          <MapPinIcon className='h-4 w-4' />
          <span>{location}</span>
        </div>
        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span>Entradas vendidas</span>
            <span>
              {ticketsSold} / {totalTickets}
            </span>
          </div>
          <Progress value={ticketPercentage} className='h-2' />
        </div>
        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span>Mesas reservadas</span>
            <span>
              {tablesSold} / {totalTables}
            </span>
          </div>
          <Progress value={tablePercentage} className='h-2' />
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <div className='flex items-center space-x-2'>
          <TicketIcon className='h-4 w-4 text-muted-foreground' />
          <span className='text-sm font-medium'>{formatCurrency(revenue)}</span>
        </div>
        <Link href={`/eventos/${id}`} className='text-sm font-medium text-primary hover:underline'>
          Gestionar evento
        </Link>
      </CardFooter>
    </Card>
  )
}
