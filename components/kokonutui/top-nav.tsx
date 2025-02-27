import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { Bell, Menu } from 'lucide-react'
import Profile01 from './profile-01'
import { ThemeToggle } from '../theme-toggle'
import { Button } from '@/components/ui/button'

interface TopNavProps {
  onMenuButtonClick: () => void
}

export default function TopNav ({ onMenuButtonClick }: TopNavProps): React.JSX.Element {
  return (
    <header className='h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container h-full flex items-center justify-between'>
        <Button variant='ghost' size='icon' className='lg:hidden' onClick={onMenuButtonClick}>
          <Menu className='h-5 w-5' />
        </Button>

        <div className='flex items-center gap-4 ml-auto'>
          <Button variant='ghost' size='icon'>
            <Bell className='h-5 w-5' />
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Image src='/placeholder.svg' alt='Avatar de usuario' width={32} height={32} className='rounded-full' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              <Profile01 avatar='/placeholder.svg' />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
