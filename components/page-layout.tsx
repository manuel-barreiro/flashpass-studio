import type React from 'react'
import Layout from './kokonutui/layout'

interface PageLayoutProps {
  children: React.ReactNode
  title: string
}

export default function PageLayout ({ children, title }: PageLayoutProps): React.JSX.Element {
  return (
    <Layout>
      <div className='space-y-6 p-6 pb-16 bg-gray-950'>
        <div className='flex flex-col space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
          <p className='text-muted-foreground'>Gestiona los detalles y configuraciones de tu evento.</p>
        </div>
        <div className='flex-1'>{children}</div>
      </div>
    </Layout>
  )
}
