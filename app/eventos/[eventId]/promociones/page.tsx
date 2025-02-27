import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

const promotions = [
  { name: 'Venta Anticipada', discount: '20%', startDate: '2023-07-01', endDate: '2023-07-15', status: 'active' },
  { name: 'Grupo +5', discount: '10%', startDate: '2023-07-15', endDate: '2023-08-14', status: 'active' },
  { name: 'Último Minuto', discount: '15%', startDate: '2023-08-13', endDate: '2023-08-15', status: 'inactive' }
]

export default function PromocionesPage (): React.JSX.Element {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Gestión de Promociones</h2>
        <Button>
          <PlusIcon className='mr-2 h-4 w-4' /> Crear Promoción
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Promociones Activas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descuento</TableHead>
                <TableHead>Fecha Inicio</TableHead>
                <TableHead>Fecha Fin</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotions.map((promo) => (
                <TableRow key={promo.name}>
                  <TableCell className='font-medium'>{promo.name}</TableCell>
                  <TableCell>{promo.discount}</TableCell>
                  <TableCell>{promo.startDate}</TableCell>
                  <TableCell>{promo.endDate}</TableCell>
                  <TableCell>
                    <Badge variant={promo.status === 'active' ? 'success' : 'secondary'}>
                      {promo.status === 'active' ? 'Activa' : 'Inactiva'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
