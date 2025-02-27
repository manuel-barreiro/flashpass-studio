'use client'

import { type ReactNode, useState } from 'react'
import Sidebar from './sidebar'
import TopNav from './top-nav'

interface LayoutProps {
  children: ReactNode
}

export default function Layout ({ children }: LayoutProps): React.JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='flex h-screen bg-gray-950'>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <TopNav onMenuButtonClick={() => setSidebarOpen(true)} />
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-background'>{children}</main>
      </div>
    </div>
  )
}
