'use client'

import type React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import PageLayout from '@/components/page-layout'
import { cn } from '@/lib/utils'

const tabs = [
  { value: 'resumen', label: 'Resumen', href: '' },
  { value: 'entradas', label: 'Entradas', href: '/entradas' },
  { value: 'combos', label: 'Combos', href: '/combos' },
  { value: 'mesas', label: 'Mesas', href: '/mesas' },
  { value: 'promociones', label: 'Promociones', href: '/promociones' },
  { value: 'estadisticas', label: 'Estadísticas', href: '/estadisticas' },
  { value: 'configuracion', label: 'Configuración', href: '/configuracion' }
]

export default function EventLayout ({ children, params }: { children: React.ReactNode, params: { eventId: string } }): React.JSX.Element {
  const pathname = usePathname()

  return (
    <PageLayout title='Gestión de Evento'>
      <div className='space-y-6'>
        <nav className='flex overflow-x-auto pb-2'>
          {tabs.map((tab) => {
            const isActive =
              tab.href === ''
                ? pathname === `/eventos/${params.eventId}`
                : pathname === `/eventos/${params.eventId}${tab.href}`

            return (
              <Link
                key={tab.value}
                href={`/eventos/${params.eventId}${tab.href}`}
                className={cn(
                  'px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                )}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>
        <div className='mt-6'>{children}</div>
      </div>
    </PageLayout>
  )
}
