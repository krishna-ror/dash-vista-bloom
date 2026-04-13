import { useApp } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, AlertTriangle, Target } from "lucide-react";
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
  { name: "Revenue Target", value: 85, fill: "#6366f1" },
  { name: "Employee Satisfaction", value: 92, fill: "#8b5cf6" },
  { name: "Client Retention", value: 78, fill: "#a78bfa" },
];

const alerts = [
  { title: "Expense Spike Detected", desc: "Marketing expenses increased 25% this month", severity: "warning" },
  { title: "3 Leave Requests Pending", desc: "Requires approval from HR manager", severity: "info" },
  { title: "Quarterly Review Due", desc: "Q1 performance review deadline in 5 days", severity: "info" },
  { title: "Budget Threshold Reached", desc: "Infrastructure budget at 90% utilization", severity: "warning" },
];

const ManagementDashboard = () => {
  const { formatCurrency } = useApp();

  const stats = [
    { title: "Total Revenue", value: formatCurrency(284500), change: "+12.5%", icon: DollarSign },
    { title: "Total Employees", value: "45", change: "+3", icon: Users },
    { title: "Growth Rate", value: "18.7%", change: "+2.3%", icon: TrendingUp },
    { title: "Active Projects", value: "12", change: "+1", icon: Target },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Management Overview</h1>
        <p className="text-muted-foreground text-sm">Company performance and insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.title} className="shadow-soft hover:shadow-glow transition-shadow duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{s.title}</span>
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-green-600 mt-1">{s.change} from last period</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader><CardTitle className="text-base">Revenue vs Expenses</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 20% 90%)" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#colorRev)" strokeWidth={2} />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#colorExp)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* KPI Gauges */}
        <Card className="shadow-soft">
          <CardHeader><CardTitle className="text-base">Key Metrics</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {kpiData.map((kpi) => (
              <div key={kpi.name} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{kpi.name}</span>
                  <span className="font-semibold text-foreground">{kpi.value}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${kpi.value}%`, background: kpi.fill }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base">Alerts & Insights</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((a, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${a.severity === "warning" ? "text-amber-500" : "text-primary"}`} />
              <div>
                <p className="text-sm font-medium text-foreground">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
              </div>
              <Badge variant="secondary" className="ml-auto text-xs shrink-0">
                {a.severity}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagementDashboard;
