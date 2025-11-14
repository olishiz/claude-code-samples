import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface CarSalesData {
  brand: string
  sales: number
  percentage: number
  [key: string]: string | number
}

// Malaysian car sales data (sample data based on typical market trends)
const carSalesData: CarSalesData[] = [
  { brand: 'Perodua', sales: 28500, percentage: 38.5 },
  { brand: 'Proton', sales: 15200, percentage: 20.5 },
  { brand: 'Honda', sales: 9800, percentage: 13.2 },
  { brand: 'Toyota', sales: 8600, percentage: 11.6 },
  { brand: 'Nissan', sales: 4300, percentage: 5.8 },
  { brand: 'Mazda', sales: 3200, percentage: 4.3 },
  { brand: 'Mitsubishi', sales: 2800, percentage: 3.8 },
  { brand: 'Others', sales: 1600, percentage: 2.3 },
]

const COLORS = ['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5', '#fff7ed', '#ea580c', '#c2410c']

export function CarSales() {
  const totalSales = carSalesData.reduce((sum, item) => sum + item.sales, 0)

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Malaysia Car Sales</h1>
        <p className="text-muted-foreground">
          Recent car purchases and market trends in Malaysia
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Sales (Monthly)</CardDescription>
            <CardTitle className="text-3xl">{totalSales.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Units sold this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Market Leader</CardDescription>
            <CardTitle className="text-3xl">{carSalesData[0].brand}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{carSalesData[0].percentage}% market share</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Brands</CardDescription>
            <CardTitle className="text-3xl">{carSalesData.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Active in Malaysian market</p>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales by Brand</CardTitle>
          <CardDescription>
            Monthly car sales breakdown by manufacturer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={carSalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="brand"
                className="text-sm"
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <YAxis
                className="text-sm"
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Bar dataKey="sales" fill="hsl(var(--primary))" name="Units Sold" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart and Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Market Share Distribution</CardTitle>
            <CardDescription>
              Percentage breakdown of car sales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={carSalesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.brand} ${entry.percentage}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="sales"
                >
                  {carSalesData.map((_item, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Sales Data</CardTitle>
            <CardDescription>
              Complete breakdown by brand
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {carSalesData.map((item, index) => (
                <div key={item.brand} className="flex items-center justify-between p-3 rounded-lg bg-accent/50 border">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div>
                      <p className="font-medium">{item.brand}</p>
                      <p className="text-sm text-muted-foreground">{item.percentage}% market share</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{item.sales.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">units</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Market Insights</CardTitle>
          <CardDescription>
            Key trends in Malaysian automotive market
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-accent/30 border">
              <h3 className="font-semibold mb-2">Local Brands Dominate</h3>
              <p className="text-sm text-muted-foreground">
                Perodua and Proton together account for 59% of the market, showing strong preference for local manufacturers.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30 border">
              <h3 className="font-semibold mb-2">Japanese Imports Strong</h3>
              <p className="text-sm text-muted-foreground">
                Honda, Toyota, and Nissan combined make up 30.6% of sales, maintaining strong presence in premium segments.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30 border">
              <h3 className="font-semibold mb-2">Compact Cars Popular</h3>
              <p className="text-sm text-muted-foreground">
                Perodua's dominance reflects Malaysian preference for compact, fuel-efficient vehicles in urban areas.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30 border">
              <h3 className="font-semibold mb-2">Growing EV Interest</h3>
              <p className="text-sm text-muted-foreground">
                Electric vehicle adoption is gradually increasing with government incentives and expanding charging infrastructure.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
