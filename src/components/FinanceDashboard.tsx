import { useApp } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const profitData = [
  { month: "Jan", profit: 40000 }, { month: "Feb", profit: 45000 }, { month: "Mar", profit: 38000 },
  { month: "Apr", profit: 52000 }, { month: "May", profit: 48000 }, { month: "Jun", profit: 61000 },
  { month: "Jul", profit: 55000 }, { month: "Aug", profit: 67000 },
];

const expenseData = [
  { name: "Salaries", value: 45, color: "#6366f1" },
  { name: "Operations", value: 20, color: "#8b5cf6" },
  { name: "Marketing", value: 15, color: "#a78bfa" },
  { name: "Infrastructure", value: 12, color: "#c4b5fd" },
  { name: "Other", value: 8, color: "#ddd6fe" },
];

const transactions = [
  { id: "TXN-001", desc: "Client Payment - Acme Corp", amount: 25000, type: "credit", date: "2024-03-15" },
  { id: "TXN-002", desc: "Office Rent", amount: 5000, type: "debit", date: "2024-03-14" },
  { id: "TXN-003", desc: "Software Licenses", amount: 3200, type: "debit", date: "2024-03-13" },
  { id: "TXN-004", desc: "Consulting Revenue", amount: 18000, type: "credit", date: "2024-03-12" },
  { id: "TXN-005", desc: "Employee Benefits", amount: 8500, type: "debit", date: "2024-03-11" },
];

const FinanceDashboard = () => {
  const { formatCurrency } = useApp();

  const stats = [
    { title: "Total Revenue", value: formatCurrency(284500), change: "+12.5%", up: true, icon: DollarSign },
    { title: "Expenses", value: formatCurrency(163200), change: "+3.2%", up: true, icon: TrendingDown },
    { title: "Net Profit", value: formatCurrency(121300), change: "+18.7%", up: true, icon: TrendingUp },
    { title: "Pending", value: formatCurrency(42000), change: "-5.1%", up: false, icon: DollarSign },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Finance Dashboard</h1>
        <p className="text-muted-foreground text-sm">Financial overview and recent activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-soft hover:shadow-glow transition-shadow duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{stat.title}</span>
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <div className={`flex items-center gap-1 text-xs mt-1 ${stat.up ? "text-green-600" : "text-destructive"}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader><CardTitle className="text-base">Profit Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 20% 90%)" />
                <XAxis dataKey="month" fontSize={12} stroke="hsl(230 15% 46%)" />
                <YAxis fontSize={12} stroke="hsl(230 15% 46%)" />
                <Tooltip />
                <Line type="monotone" dataKey="profit" stroke="hsl(245 58% 51%)" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader><CardTitle className="text-base">Expense Breakdown</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={expenseData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {expenseData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-2">
              {expenseData.map((e) => (
                <div key={e.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />
                  {e.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base">Recent Transactions</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-left">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-mono text-xs text-muted-foreground">{t.id}</td>
                    <td className="py-3">{t.desc}</td>
                    <td className="py-3 text-muted-foreground">{t.date}</td>
                    <td className={`py-3 text-right font-semibold ${t.type === "credit" ? "text-green-600" : "text-destructive"}`}>
                      {t.type === "credit" ? "+" : "-"}{formatCurrency(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceDashboard;
