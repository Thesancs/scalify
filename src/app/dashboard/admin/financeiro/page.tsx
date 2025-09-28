
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Badge,
} from '@/components/ui/badge';
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  Repeat,
  Activity,
} from 'lucide-react';
import {
    ChartTooltipContent,
    ChartTooltip,
    ChartContainer,
} from '@/components/ui/chart';


// Mock Data
const kpiData = {
  totalRevenue: {
    value: 'R$45.231,89',
    change: '+20,1% vs. último mês',
    changeType: 'increase',
  },
  activeSubscriptions: {
    value: '+2.350',
    change: '+180,1% vs. último mês',
    changeType: 'increase',
  },
  mrr: {
    value: 'R$12.450,00',
    change: '+12% vs. último mês',
    changeType: 'increase',
  },
  churnRate: {
    value: '4,1%',
    change: '-1,2% vs. último mês',
    changeType: 'decrease',
  },
};

const chartData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Fev', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Abr', revenue: 4500 },
  { month: 'Mai', revenue: 6000 },
  { month: 'Jun', revenue: 7200 },
];

const chartConfig = {
  revenue: {
    label: "Receita",
    color: "hsl(var(--primary))",
  },
} satisfies import('@/components/ui/chart').ChartConfig;


const recentTransactions = [
  {
    id: 'txn_1',
    customer: 'João Silva',
    email: 'joao.silva@example.com',
    amount: 'R$299,00',
    status: 'bem-sucedido',
    date: '2024-07-26',
  },
  {
    id: 'txn_2',
    customer: 'Maria Oliveira',
    email: 'maria.o@example.com',
    amount: 'R$99,00',
    status: 'bem-sucedido',
    date: '2024-07-26',
  },
  {
    id: 'txn_3',
    customer: 'Carlos Pereira',
    email: 'carlos.p@example.com',
    amount: 'R$149,00',
    status: 'falhou',
    date: '2024-07-25',
  },
  {
    id: 'txn_4',
    customer: 'Ana Costa',
    email: 'ana.costa@example.com',
    amount: 'R$499,00',
    status: 'bem-sucedido',
    date: '2024-07-25',
  },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'bem-sucedido':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'falhou':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'secondary';
  }
};


export default function FinanceiroPage() {
  return (
    <div className="container mx-auto max-w-7xl py-8 animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Visão Financeira Geral
        </h1>
        <p className="text-muted-foreground">
          Acompanhe as principais métricas financeiras da plataforma.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glassmorphic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.totalRevenue.value}</div>
            <p className="text-xs text-muted-foreground">{kpiData.totalRevenue.change}</p>
          </CardContent>
        </Card>
        <Card className="glassmorphic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assinaturas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.activeSubscriptions.value}</div>
            <p className="text-xs text-muted-foreground">{kpiData.activeSubscriptions.change}</p>
          </CardContent>
        </Card>
        <Card className="glassmorphic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MRR</CardTitle>
            <Repeat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.mrr.value}</div>
            <p className="text-xs text-muted-foreground">{kpiData.mrr.change}</p>
          </CardContent>
        </Card>
        <Card className="glassmorphic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.churnRate.value}</div>
             <p className="text-xs text-muted-foreground">{kpiData.churnRate.change}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glassmorphic">
          <CardHeader>
            <CardTitle>Receita dos Últimos 6 Meses</CardTitle>
            <CardDescription>
                Uma visão geral do crescimento da receita mensal recorrente.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <ChartContainer config={chartConfig} className="w-full h-[300px]">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted/50" />
                    <XAxis
                        dataKey="month"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `R$${value / 1000}k`}
                    />
                    <ChartTooltip 
                        cursor={false}
                        content={<ChartTooltipContent 
                            formatter={(value) => `R$${value.toLocaleString('pt-BR')}`}
                            indicator="dot"
                        />}
                    />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="glassmorphic">
          <CardHeader>
            <CardTitle>Últimas Transações</CardTitle>
            <CardDescription>
              As transações mais recentes da plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableBody>
                    {recentTransactions.map((transaction) => (
                        <TableRow key={transaction.id} className="hover:bg-muted/10">
                            <TableCell>
                                <div className="font-medium text-foreground">{transaction.customer}</div>
                                <div className="text-sm text-muted-foreground">{transaction.email}</div>
                            </TableCell>
                            <TableCell className="text-right">
                                 <div className="font-medium text-foreground">{transaction.amount}</div>
                                 <Badge className={`text-xs capitalize ${getStatusBadgeVariant(transaction.status)}`}>{transaction.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
