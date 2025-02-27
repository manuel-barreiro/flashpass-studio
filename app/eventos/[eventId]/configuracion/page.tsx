import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function ConfiguracionPage (): React.JSX.Element {
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold'>Configuración del Evento</h2>

      <Card>
        <CardHeader>
          <CardTitle>Detalles Generales</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='event-name'>Nombre del Evento</Label>
            <Input id='event-name' placeholder='Ingrese el nombre del evento' />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='event-date'>Fecha del Evento</Label>
            <Input id='event-date' type='date' />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='event-location'>Ubicación</Label>
            <Input id='event-location' placeholder='Ingrese la ubicación del evento' />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='event-description'>Descripción</Label>
            <Textarea id='event-description' placeholder='Describa el evento' />
          </div>
          <Button>Guardar Cambios</Button>
        </CardContent>
      </Card>
    </div>
  )
}
