import {
  BarChart2,
  Users2,
  Shield,
  UserCircle,
  Settings,
  HelpCircle,
  X,
  Home,
  Calendar,
  Database,
  Mail,
  Briefcase,
  FileText,
  Coffee,
  Grid
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type React from 'react' // Added import for React

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function Sidebar ({ open, setOpen }: SidebarProps): React.JSX.Element {
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100 lg:hidden',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setOpen(false)}
      />
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-background border-r border-border transition-all duration-300 ease-in-out transform lg:translate-x-0 lg:static',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className='flex flex-col h-full bg-gray-900'>
          <div className='h-16 px-6 flex items-center border-b border-border'>
            <Link href='/' className='flex items-center space-x-2'>
              <Image src='/placeholder.svg' alt='FlashPass' width={32} height={32} />
              <span className='text-lg font-semibold'>FlashPass Studio</span>
            </Link>
            <button className='ml-auto p-2 rounded-md lg:hidden' onClick={() => setOpen(false)}>
              <X className='h-5 w-5' />
            </button>
          </div>

          <nav className='flex-1 overflow-y-auto py-4'>
            <NavSection title='Principal'>
              <NavItem href='/dashboard' icon={Home}>
                Panel
              </NavItem>
              <NavItem href='/eventos' icon={Calendar}>
                Eventos
              </NavItem>
              <NavItem href='/analytics' icon={BarChart2}>
                Analytics
              </NavItem>
              <NavItem href='/crm' icon={Database}>
                CRM
              </NavItem>
              <NavItem href='/marketing' icon={Mail}>
                Marketing
              </NavItem>
            </NavSection>

            <NavSection title='Equipo'>
              <NavItem href='/miembros' icon={Users2}>
                Miembros
              </NavItem>
              <NavItem href='/permisos' icon={Shield}>
                Permisos
              </NavItem>
              <NavItem href='/equipos' icon={Briefcase}>
                Equipos
              </NavItem>
            </NavSection>

            <NavSection title='Perfil'>
              <NavItem href='/perfil' icon={UserCircle}>
                Mi Perfil
              </NavItem>
            </NavSection>

            <NavSection title='Establecimiento'>
              <NavItem href='/cartas' icon={FileText}>
                Cartas
              </NavItem>
              <NavItem href='/componentes' icon={Coffee}>
                Componentes
              </NavItem>
              <NavItem href='/establecimientos' icon={Grid}>
                Establecimientos
              </NavItem>
            </NavSection>
          </nav>

          <div className='p-4 border-t border-border'>
            <NavItem href='/configuracion' icon={Settings}>
              Configuración
            </NavItem>
            <NavItem href='/ayuda' icon={HelpCircle}>
              Ayuda
            </NavItem>
          </div>
        </div>
      </aside>
    </>
  )
}

function NavSection ({ title, children }: { title: string, children: React.ReactNode }): React.JSX.Element {
  return (
    <div className='mb-4'>
      <h2 className='px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>{title}</h2>
      {children}
    </div>
  )
}

function NavItem ({ href, icon: Icon, children }: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <Link
      href={href}
      className='flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors'
    >
      <Icon className='h-4 w-4 mr-3 flex-shrink-0' />
      {children}
    </Link>
  )
}
