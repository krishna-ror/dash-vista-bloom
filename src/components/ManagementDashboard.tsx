import { useApp } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, AlertTriangle, Target, Briefcase, ArrowUpRight, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { month: "Jan", revenue: 180000, expenses: 140000 },
  { month: "Feb", revenue: 200000, expenses: 145000 },
  { month: "Mar", revenue: 195000, expenses: 138000 },
  { month: "Apr", revenue: 220000, expenses: 150000 },
  { month: "May", revenue: 240000, expenses: 155000 },
  { month: "Jun", revenue: 284500, expenses: 163200 },
];

const kpiData = [
  { name: "Revenue Target", value: 85, color: "hsl(var(--primary))" },
  { name: "Employee Satisfaction", value: 92, color: "hsl(var(--success))" },
  { name: "Client Retention", value: 78, color: "hsl(var(--gold))" },
  { name: "Project Delivery", value: 88, color: "hsl(var(--info))" },
];

const alerts = [
  { title: "Marketing Expense Spike", desc: "Marketing expenses increased 25% this month", severity: "warning", time: "2h ago" },
  { title: "3 Leave Requests Pending", desc: "Requires approval from HR manager", severity: "info", time: "5h ago" },
  { title: "Quarterly Review Due", desc: "Q1 performance review deadline in 5 days", severity: "info", time: "1d ago" },
  { title: "Budget Threshold Reached", desc: "Infrastructure budget at 90% utilization", severity: "warning", time: "2d ago" },
];

const ManagementDashboard = () => {
  const { formatCurrency } = useApp();

  const stats = [
    { title: "Total Revenue", value: formatCurrency(284500), change: "+12.5%", icon: DollarSign, color: "from-primary to-primary-glow" },
    { title: "Total Employees", value: "45", change: "+3", icon: Users, color: "from-info to-info/70" },
    { title: "Growth Rate", value: "18.7%", change: "+2.3%", icon: TrendingUp, color: "from-success to-success/70" },
    { title: "Active Projects", value: "12", change: "+1", icon: Briefcase, color: "from-gold to-gold/70" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl gradient-hero p-6 sm:p-8 text-primary-foreground">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative">
          <p className="text-xs font-medium uppercase tracking-widest text-primary-foreground/60 mb-2">Executive</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Welcome back, John</h1>
          <p className="text-primary-foreground/70 mt-2 max-w-2xl">
            Here's how the company is performing today. Revenue is up 12.5%, expenses are under control, and your team is at 93% attendance.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs">
              <Activity className="w-3.5 h-3.5 text-success" />
              All systems healthy
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs">
              <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
              Q2 forecast on track
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.title} className="shadow-card hover-lift border-border/60">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-soft`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <span className="flex items-center gap-0.5 text-xs font-medium px-2 py-1 rounded-md bg-success/10 text-success">
                  <ArrowUpRight className="w-3 h-3" />
                  {s.change}
                </span>
              </div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{s.title}</p>
              <p className="font-display text-2xl font-bold text-foreground mt-1">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 shadow-card border-border/60">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-display">Revenue vs Expenses</CardTitle>
                <CardDescription className="text-xs">6-month performance trend</CardDescription>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /> Revenue</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-destructive" /> Expenses</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" fontSize={11} stroke="hsl(var(--muted-foreground))" axisLine={false} tickLine={false} />
                <YAxis fontSize={11} stroke="hsl(var(--muted-foreground))" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12 }} formatter={(v: number) => formatCurrency(v)} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#colorRev)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="expenses" stroke="hsl(var(--destructive))" fill="url(#colorExp)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border/60">
          <CardHeader>
            <CardTitle className="text-base font-display">Key Metrics</CardTitle>
            <CardDescription className="text-xs">Performance against targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {kpiData.map((kpi) => (
              <div key={kpi.name} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{kpi.name}</span>
                  <span className="font-semibold text-foreground tabular-nums">{kpi.value}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${kpi.value}%`, background: kpi.color }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="shadow-card border-border/60">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-display">Alerts & Insights</CardTitle>
              <CardDescription className="text-xs">Items that need your attention</CardDescription>
            </div>
            <Badge variant="secondary" className="text-xs">{alerts.length} new</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {alerts.map((a, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-colors group">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${a.severity === "warning" ? "bg-warning/15 text-warning" : "bg-info/15 text-info"}`}>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
              </div>
              <span className="text-[10px] text-muted-foreground shrink-0">{a.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagementDashboard;
