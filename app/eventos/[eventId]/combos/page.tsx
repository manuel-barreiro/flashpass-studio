import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

const combos = [
  {
    name: 'VIP Experience',
    description: '1 VIP ticket + 1 drink + 1 merchandise item',
    price: 150,
    available: 50,
    sold: 30
  },
  {
    name: 'Group Package',
    description: '4 General tickets + 4 drinks + 1 snack platter',
    price: 220,
    available: 25,
    sold: 15
  },
  {
    name: 'Ultimate Fan',
    description: '1 Platinum ticket + 1 meet & greet pass + 1 exclusive merchandise',
    price: 300,
    available: 10,
    sold: 8
  }
]

export default function CombosPage (): React.JSX.Element {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Gestión de Combos</h2>
        <Button>
          <PlusIcon className='mr-2 h-4 w-4' /> Crear Combo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Combos Disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Disponibles</TableHead>
                <TableHead>Vendidos</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {combos.map((combo) => (
                <TableRow key={combo.name}>
                  <TableCell className='font-medium'>{combo.name}</TableCell>
                  <TableCell>{combo.description}</TableCell>
                  <TableCell>{combo.price}€</TableCell>
                  <TableCell>{combo.available}</TableCell>
                  <TableCell>{combo.sold}</TableCell>
                  <TableCell>
                    <Badge variant={combo.available > 0 ? 'success' : 'destructive'}>
                      {combo.available > 0 ? 'Disponible' : 'Agotado'}
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
