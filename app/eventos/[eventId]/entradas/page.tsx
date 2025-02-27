import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

const ticketTypes = [
  { name: 'General', sold: 800, total: 1000, price: 50 },
  { name: 'VIP', sold: 150, total: 200, price: 100 },
  { name: 'Platinum', sold: 45, total: 50, price: 200 }
]

export default function EntradasPage (): React.JSX.Element {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Gestión de Entradas</h2>
        <Button>
          <PlusIcon className='mr-2 h-4 w-4' /> Crear Tipo de Entrada
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tipos de Entradas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Vendidas</TableHead>
                <TableHead>Disponibles</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ticketTypes.map((type) => (
                <TableRow key={type.name}>
                  <TableCell className='font-medium'>{type.name}</TableCell>
                  <TableCell>{type.sold}</TableCell>
                  <TableCell>{type.total - type.sold}</TableCell>
                  <TableCell>{type.price}€</TableCell>
                  <TableCell>
                    <Badge variant={type.sold === type.total ? 'destructive' : 'success'}>
                      {type.sold === type.total ? 'Agotado' : 'Disponible'}
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
