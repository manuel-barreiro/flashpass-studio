'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlusIcon, Upload } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'

const zonas = [
  { name: 'Zona VIP', mesas: 10, reservadas: 8 },
  { name: 'Zona Estándar', mesas: 20, reservadas: 15 },
  { name: 'Zona Lounge', mesas: 5, reservadas: 3 }
]

const tarifas = [
  { zona: 'Zona VIP', precio: 500 },
  { zona: 'Zona Estándar', precio: 300 },
  { zona: 'Zona Lounge', precio: 400 }
]

export default function MesasPage (): React.JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files != null) {
      if (event.target.files[0] !== null && event.target.files[0] !== undefined) {
        setSelectedFile(event.target.files[0])
      }
    }
  }

  const handleUpload = (): void => {
    if (selectedFile != null) {
      // Here you would typically handle the file upload to your server
      console.log('Uploading file:', selectedFile.name)
      // Reset the selected file after upload
      setSelectedFile(null)
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Gestión de Reservas</h2>
        <Button>
          <PlusIcon className='mr-2 h-4 w-4' /> Añadir Zona
        </Button>
      </div>

      <Tabs defaultValue='zonas'>
        <TabsList>
          <TabsTrigger value='zonas'>Zonas</TabsTrigger>
          <TabsTrigger value='tarifas'>Tarifas de Mesas</TabsTrigger>
          <TabsTrigger value='mapa'>Mapa del Venue</TabsTrigger>
        </TabsList>

        <TabsContent value='zonas'>
          <Card>
            <CardHeader>
              <CardTitle>Zonas de Reserva</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre de la Zona</TableHead>
                    <TableHead>Mesas Totales</TableHead>
                    <TableHead>Mesas Reservadas</TableHead>
                    <TableHead>Disponibilidad</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {zonas.map((zona) => (
                    <TableRow key={zona.name}>
                      <TableCell className='font-medium'>{zona.name}</TableCell>
                      <TableCell>{zona.mesas}</TableCell>
                      <TableCell>{zona.reservadas}</TableCell>
                      <TableCell>
                        <Badge variant={zona.mesas > zona.reservadas ? 'success' : 'destructive'}>
                          {zona.mesas > zona.reservadas ? 'Disponible' : 'Completo'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='tarifas'>
          <Card>
            <CardHeader>
              <CardTitle>Tarifas de Mesas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zona</TableHead>
                    <TableHead>Precio por Mesa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tarifas.map((tarifa) => (
                    <TableRow key={tarifa.zona}>
                      <TableCell className='font-medium'>{tarifa.zona}</TableCell>
                      <TableCell>{tarifa.precio}€</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='mapa'>
          <Card>
            <CardHeader>
              <CardTitle>Mapa del Venue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center space-x-4'>
                  <Input type='file' accept='image/*' onChange={handleFileChange} className='max-w-sm' />
                  <Button onClick={handleUpload} disabled={selectedFile == null}>
                    <Upload className='mr-2 h-4 w-4' />
                    Subir Mapa
                  </Button>
                </div>
                {(selectedFile != null) && (
                  <p className='text-sm text-muted-foreground'>Archivo seleccionado: {selectedFile.name}</p>
                )}
                <div className='border-2 border-dashed border-gray-300 rounded-lg p-4 text-center'>
                  <p className='text-muted-foreground'>
                    {(selectedFile != null)
                      ? "Haga clic en 'Subir Mapa' para cargar el archivo seleccionado."
                      : 'Seleccione un archivo de imagen para cargar el mapa del venue.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
