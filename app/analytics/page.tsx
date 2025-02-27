'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'
import { ArrowUpIcon, ArrowDownIcon, DollarSign, Users, Calendar } from 'lucide-react'
import PageLayout from '@/components/page-layout'

// Mock data (replace with real data fetching in production)
const kpiData = {
  totalRevenue: 1250000,
  totalAttendees: 45000,
  averageTicketPrice: 85,
  eventCount: 25
}

const revenueData = [
  { name: 'Jan', value: 100000 },
  { name: 'Feb', value: 120000 },
  { name: 'Mar', value: 150000 },
  { name: 'Apr', value: 180000 },
  { name: 'May', value: 220000 },
  { name: 'Jun', value: 250000 }
]

const attendanceData = [
  { name: 'Jan', value: 5000 },
  { name: 'Feb', value: 6000 },
  { name: 'Mar', value: 7500 },
  { name: 'Apr', value: 9000 },
  { name: 'May', value: 11000 },
  { name: 'Jun', value: 12500 }
]

export default function AnalyticsPage () {
  const [dateRange, setDateRange] = useState({ from: new Date(2023, 0, 1), to: new Date() })

  return (
    <PageLayout title='Analytics'>
      <div className='container mx-auto p-6 space-y-8'>
        <h1 className='text-3xl font-bold'>Analytics Dashboard</h1>

        <div className='flex flex-wrap gap-4 mb-6'>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select Event' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Events</SelectItem>
              <SelectItem value='event1'>Summer Festival</SelectItem>
              <SelectItem value='event2'>Winter Gala</SelectItem>
            </SelectContent>
          </Select>

          <DatePickerWithRange date={dateRange} setDate={setDateRange} />

          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select Menu' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Menus</SelectItem>
              <SelectItem value='menu1'>VIP Menu</SelectItem>
              <SelectItem value='menu2'>Standard Menu</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select Collaborator' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Collaborators</SelectItem>
              <SelectItem value='collab1'>John Doe</SelectItem>
              <SelectItem value='collab2'>Jane Smith</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <KPICard
            title='Total Revenue'
            value={`$${kpiData.totalRevenue.toLocaleString()}`}
            description='15% increase from last month'
            trend='up'
            icon={<DollarSign className='h-4 w-4 text-muted-foreground' />}
          />
          <KPICard
            title='Total Attendees'
            value={kpiData.totalAttendees.toLocaleString()}
            description='8% increase from last month'
            trend='up'
            icon={<Users className='h-4 w-4 text-muted-foreground' />}
          />
          <KPICard
            title='Average Ticket Price'
            value={`$${kpiData.averageTicketPrice}`}
            description='3% decrease from last month'
            trend='down'
            icon={<DollarSign className='h-4 w-4 text-muted-foreground' />}
          />
          <KPICard
            title='Total Events'
            value={kpiData.eventCount.toString()}
            description='2 more than last month'
            trend='up'
            icon={<Calendar className='h-4 w-4 text-muted-foreground' />}
          />
        </div>

        <Tabs defaultValue='revenue' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='revenue'>Revenue</TabsTrigger>
            <TabsTrigger value='attendance'>Attendance</TabsTrigger>
          </TabsList>
          <TabsContent value='revenue' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
                <CardDescription>Monthly revenue trend</CardDescription>
              </CardHeader>
              <CardContent className='h-[400px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='value' fill='#8884d8' name='Revenue' />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='attendance' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Attendance Over Time</CardTitle>
                <CardDescription>Monthly attendance trend</CardDescription>
              </CardHeader>
              <CardContent className='h-[400px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='value' stroke='#82ca9d' name='Attendees' />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}

function KPICard ({ title, value, description, trend, icon }) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        <p className='text-xs text-muted-foreground'>
          {trend === 'up'
            ? (
              <ArrowUpIcon className='inline-block h-4 w-4 text-green-500 mr-1' />
              )
            : (
              <ArrowDownIcon className='inline-block h-4 w-4 text-red-500 mr-1' />
              )}
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
