'use client'

import { useState } from 'react'
import PageLayout from '@/components/page-layout'
import { EventCard } from '@/components/event-card'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const sampleEvents = [
  {
    id: '1',
    title: 'Concierto de Rock',
    date: '15 de agosto, 2023',
    location: 'Estadio Central',
    ticketsSold: 1500,
    totalTickets: 2000,
    tablesSold: 45,
    totalTables: 50,
    revenue: 75000,
    status: 'upcoming' as const
  },
  {
    id: '2',
    title: 'Festival de Jazz',
    date: '22 de agosto, 2023',
    location: 'Parque Municipal',
    ticketsSold: 800,
    totalTickets: 1000,
    tablesSold: 20,
    totalTables: 30,
    revenue: 40000,
    status: 'upcoming' as const
  },
  {
    id: '3',
    title: 'Obra de Teatro',
    date: '29 de agosto, 2023',
    location: 'Teatro Nacional',
    ticketsSold: 300,
    totalTickets: 500,
    tablesSold: 10,
    totalTables: 15,
    revenue: 15000,
    status: 'upcoming' as const
  },
  {
    id: '4',
    title: 'Concierto de Pop',
    date: '1 de julio, 2023',
    location: 'Arena Ciudad',
    ticketsSold: 5000,
    totalTickets: 5000,
    tablesSold: 100,
    totalTables: 100,
    revenue: 250000,
    status: 'past' as const
  }
]

export default function EventosPage (): React.JSX.Element {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')

  const filteredEvents = sampleEvents.filter((event) => {
    if (filter === 'all') return true
    return event.status === filter
  })

  return (
    <PageLayout title='Eventos'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
          <p className='text-gray-600 dark:text-gray-400'>Gestiona tus eventos aquí.</p>
          <Select value={filter} onValueChange={(value: 'all' | 'upcoming' | 'past') => setFilter(value)}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filtrar eventos' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Todos los eventos</SelectItem>
              <SelectItem value='upcoming'>Próximos eventos</SelectItem>
              <SelectItem value='past'>Eventos pasados</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>
          <PlusIcon className='mr-2 h-4 w-4' /> Crear Evento
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </PageLayout>
  )
}
