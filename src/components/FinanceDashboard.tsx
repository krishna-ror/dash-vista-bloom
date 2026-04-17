import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight,
  Plus, Receipt, FileText, Wallet, PiggyBank,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts";

const profitData = [
  { month: "Jan", profit: 40000, revenue: 180000, expenses: 140000 },
  { month: "Feb", profit: 55000, revenue: 200000, expenses: 145000 },
  { month: "Mar", profit: 57000, revenue: 195000, expenses: 138000 },
  { month: "Apr", profit: 70000, revenue: 220000, expenses: 150000 },
  { month: "May", profit: 85000, revenue: 240000, expenses: 155000 },
  { month: "Jun", profit: 121300, revenue: 284500, expenses: 163200 },
];

const expenseColors = ["hsl(222 60% 16%)", "hsl(215 50% 35%)", "hsl(211 70% 45%)", "hsl(42 65% 52%)", "hsl(215 25% 65%)"];

const initialExpenses = [
  { id: "X001", category: "Salaries", desc: "Monthly payroll", amount: 73500, date: "2024-03-01" },
  { id: "X002", category: "Operations", desc: "Office supplies", amount: 32600, date: "2024-03-05" },
  { id: "X003", category: "Marketing", desc: "Q1 campaign", amount: 24400, date: "2024-03-08" },
  { id: "X004", category: "Infrastructure", desc: "AWS cloud services", amount: 19500, date: "2024-03-10" },
  { id: "X005", category: "Other", desc: "Miscellaneous", amount: 13200, date: "2024-03-12" },
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
  const [expenses, setExpenses] = useState(initialExpenses);
  const [open, setOpen] = useState(false);
  const [newExp, setNewExp] = useState({ category: "Operations", desc: "", amount: "", date: new Date().toISOString().slice(0, 10) });

  const totalRev = 284500;
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0);
  const grossProfit = totalRev - totalExp * 0.6;
  const netProfit = totalRev - totalExp;

  const expenseBreakdown = Object.entries(
    expenses.reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {})
  ).map(([name, value], i) => ({ name, value, color: expenseColors[i % expenseColors.length] }));

  const handleAddExpense = () => {
    const amt = Number(newExp.amount);
    if (!newExp.desc || !amt) {
      toast.error("Please fill description and amount");
      return;
    }
    const exp = {
      id: `X${String(expenses.length + 1).padStart(3, "0")}`,
      category: newExp.category,
      desc: newExp.desc,
      amount: amt,
      date: newExp.date,
    };
    setExpenses([exp, ...expenses]);
    setNewExp({ category: "Operations", desc: "", amount: "", date: new Date().toISOString().slice(0, 10) });
    setOpen(false);
    toast.success("Expense recorded");
  };

  const stats = [
    { title: "Total Revenue", value: formatCurrency(totalRev), change: "+12.5%", up: true, icon: DollarSign, color: "from-primary to-primary-glow" },
    { title: "Total Expenses", value: formatCurrency(totalExp), change: "+3.2%", up: false, icon: Wallet, color: "from-destructive to-destructive/70" },
    { title: "Net Profit", value: formatCurrency(netProfit), change: "+18.7%", up: true, icon: TrendingUp, color: "from-success to-success/70" },
    { title: "Cash Reserve", value: formatCurrency(485000), change: "+5.4%", up: true, icon: PiggyBank, color: "from-gold to-gold/70" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">Finance</p>
          <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">Financial Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">Track revenue, expenses, and profitability in real time.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-primary-foreground hover-lift">
                <Plus className="w-4 h-4 mr-1.5" /> Record Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">Record new expense</DialogTitle>
                <DialogDescription>Log an expense to keep the books accurate.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={newExp.category} onValueChange={(v) => setNewExp({ ...newExp, category: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Salaries", "Operations", "Marketing", "Infrastructure", "Travel", "Other"].map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" value={newExp.date} onChange={(e) => setNewExp({ ...newExp, date: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={newExp.desc} onChange={(e) => setNewExp({ ...newExp, desc: e.target.value })} placeholder="What was this for?" rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input type="number" value={newExp.amount} onChange={(e) => setNewExp({ ...newExp, amount: e.target.value })} placeholder="0.00" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleAddExpense} className="gradient-primary text-primary-foreground">Save Expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card hover-lift border-border/60 overflow-hidden relative">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-soft`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium px-2 py-1 rounded-md ${stat.up ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</p>
              <p className="font-display text-2xl font-bold text-foreground mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/60 p-1 h-11">
          <TabsTrigger value="overview" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">Overview</TabsTrigger>
          <TabsTrigger value="pl" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">P&L Statement</TabsTrigger>
          <TabsTrigger value="expenses" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">Expenses</TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">Transactions</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2 shadow-card border-border/60">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-display">Profit Trend</CardTitle>
                    <CardDescription className="text-xs">Net profit over the last 6 months</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">YTD</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={profitData}>
                    <defs>
                      <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="month" fontSize={11} stroke="hsl(var(--muted-foreground))" axisLine={false} tickLine={false} />
                    <YAxis fontSize={11} stroke="hsl(var(--muted-foreground))" axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                    <Line type="monotone" dataKey="profit" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--primary))" }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border/60">
              <CardHeader>
                <CardTitle className="text-base font-display">Expense Breakdown</CardTitle>
                <CardDescription className="text-xs">By category this month</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={2}>
                      {expenseBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12 }} formatter={(v: number) => formatCurrency(v)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 w-full">
                  {expenseBreakdown.map((e) => (
                    <div key={e.name} className="flex items-center gap-2 text-xs">
                      <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: e.color }} />
                      <span className="text-muted-foreground truncate">{e.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* P&L Statement */}
        <TabsContent value="pl" className="mt-4">
          <Card className="shadow-card border-border/60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Profit & Loss Statement
                  </CardTitle>
                  <CardDescription className="text-xs">For the period ending June 30, 2024</CardDescription>
                </div>
                <Button size="sm" variant="outline">Export PDF</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {/* Revenue */}
                <div className="px-4 py-2 bg-muted/40 rounded-lg">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Revenue</p>
                </div>
                {[
                  { label: "Product Sales", value: 198500 },
                  { label: "Service Revenue", value: 72000 },
                  { label: "Other Income", value: 14000 },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between px-4 py-2.5 text-sm border-b border-border/50">
                    <span className="text-foreground">{r.label}</span>
                    <span className="font-medium text-foreground tabular-nums">{formatCurrency(r.value)}</span>
                  </div>
                ))}
                <div className="flex justify-between px-4 py-3 text-sm font-semibold border-b-2 border-border bg-accent/30">
                  <span>Total Revenue</span>
                  <span className="tabular-nums text-primary">{formatCurrency(totalRev)}</span>
                </div>

                {/* COGS */}
                <div className="px-4 py-2 bg-muted/40 rounded-lg mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cost of Goods Sold</p>
                </div>
                {[
                  { label: "Direct Materials", value: 48000 },
                  { label: "Direct Labor", value: 36000 },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between px-4 py-2.5 text-sm border-b border-border/50">
                    <span className="text-foreground">{r.label}</span>
                    <span className="font-medium text-foreground tabular-nums">({formatCurrency(r.value)})</span>
                  </div>
                ))}
                <div className="flex justify-between px-4 py-3 text-sm font-semibold border-b-2 border-border bg-accent/30">
                  <span>Gross Profit</span>
                  <span className="tabular-nums text-success">{formatCurrency(grossProfit)}</span>
                </div>

                {/* Operating Expenses */}
                <div className="px-4 py-2 bg-muted/40 rounded-lg mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Operating Expenses</p>
                </div>
                {expenseBreakdown.map((e) => (
                  <div key={e.name} className="flex justify-between px-4 py-2.5 text-sm border-b border-border/50">
                    <span className="text-foreground">{e.name}</span>
                    <span className="font-medium text-foreground tabular-nums">({formatCurrency(e.value)})</span>
                  </div>
                ))}
                <div className="flex justify-between px-4 py-3 text-sm font-semibold border-b-2 border-border bg-accent/30">
                  <span>Total Operating Expenses</span>
                  <span className="tabular-nums text-destructive">({formatCurrency(totalExp)})</span>
                </div>

                {/* Net Profit */}
                <div className="flex justify-between px-4 py-4 mt-4 rounded-xl gradient-primary text-primary-foreground font-display font-bold text-lg">
                  <span>Net Profit</span>
                  <span className="tabular-nums">{formatCurrency(netProfit)}</span>
                </div>
                <p className="text-xs text-muted-foreground text-right mt-2">
                  Net Margin: <span className="font-semibold text-foreground">{((netProfit / totalRev) * 100).toFixed(1)}%</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expenses */}
        <TabsContent value="expenses" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="shadow-card border-border/60">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Total Expenses</p>
                    <p className="font-display text-2xl font-bold text-foreground mt-1">{formatCurrency(totalExp)}</p>
                  </div>
                  <Receipt className="w-8 h-8 text-primary opacity-30" />
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card border-border/60">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Largest Category</p>
                    <p className="font-display text-2xl font-bold text-foreground mt-1">{expenseBreakdown[0]?.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{formatCurrency(expenseBreakdown[0]?.value || 0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card border-border/60">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Entries</p>
                    <p className="font-display text-2xl font-bold text-foreground mt-1">{expenses.length}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">This period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-card border-border/60">
            <CardHeader>
              <CardTitle className="text-base font-display">Expenses by Category</CardTitle>
              <CardDescription className="text-xs">Total spend grouped by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={expenseBreakdown} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" fontSize={11} stroke="hsl(var(--muted-foreground))" axisLine={false} tickLine={false} tickFormatter={(v) => formatCurrency(v)} />
                  <YAxis type="category" dataKey="name" fontSize={11} stroke="hsl(var(--muted-foreground))" axisLine={false} tickLine={false} width={100} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12 }} formatter={(v: number) => formatCurrency(v)} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {expenseBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card border-border/60">
            <CardHeader>
              <CardTitle className="text-base font-display">Recent Expenses</CardTitle>
              <CardDescription className="text-xs">All recorded expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground text-left text-xs uppercase tracking-wider">
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">Category</th>
                      <th className="pb-3 font-medium">Description</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((e) => (
                      <tr key={e.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 font-mono text-xs text-muted-foreground">{e.id}</td>
                        <td className="py-3"><Badge variant="secondary" className="text-xs">{e.category}</Badge></td>
                        <td className="py-3 text-foreground">{e.desc}</td>
                        <td className="py-3 text-muted-foreground text-xs">{e.date}</td>
                        <td className="py-3 text-right font-semibold text-destructive tabular-nums">-{formatCurrency(e.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions */}
        <TabsContent value="transactions" className="mt-4">
          <Card className="shadow-card border-border/60">
            <CardHeader>
              <CardTitle className="text-base font-display">Recent Transactions</CardTitle>
              <CardDescription className="text-xs">Latest credits and debits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground text-left text-xs uppercase tracking-wider">
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
                        <td className="py-3 text-foreground">{t.desc}</td>
                        <td className="py-3 text-muted-foreground text-xs">{t.date}</td>
                        <td className={`py-3 text-right font-semibold tabular-nums ${t.type === "credit" ? "text-success" : "text-destructive"}`}>
                          {t.type === "credit" ? "+" : "-"}{formatCurrency(t.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceDashboard;
