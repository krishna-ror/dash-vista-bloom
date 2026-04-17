import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Users, UserCheck, Clock, UserPlus, CheckCircle2, XCircle,
  Briefcase, Building2, Mail, Calendar,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const initialAttendance = [
  { day: "Mon", present: 42, absent: 3 },
  { day: "Tue", present: 44, absent: 1 },
  { day: "Wed", present: 40, absent: 5 },
  { day: "Thu", present: 43, absent: 2 },
  { day: "Fri", present: 38, absent: 7 },
];

interface Employee {
  id: string;
  name: string;
  email: string;
  dept: string;
  status: "Active" | "On Leave" | "Onboarding";
  role: string;
  joined: string;
}

interface LeaveReq {
  id: string;
  name: string;
  type: string;
  days: number;
  from: string;
  to: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

interface Department {
  name: string;
  manager: string;
  employees: number;
  budget: string;
}

const initialEmployees: Employee[] = [
  { id: "E001", name: "Sarah Chen", email: "sarah@company.com", dept: "Engineering", status: "Active", role: "Sr. Developer", joined: "2022-03-15" },
  { id: "E002", name: "James Wilson", email: "james@company.com", dept: "Marketing", status: "Active", role: "Marketing Lead", joined: "2021-07-22" },
  { id: "E003", name: "Priya Patel", email: "priya@company.com", dept: "Finance", status: "On Leave", role: "Accountant", joined: "2023-01-10" },
  { id: "E004", name: "Mike Johnson", email: "mike@company.com", dept: "Operations", status: "Active", role: "Ops Manager", joined: "2020-11-05" },
  { id: "E005", name: "Lisa Kumar", email: "lisa@company.com", dept: "HR", status: "Active", role: "HR Specialist", joined: "2022-09-18" },
];

const initialLeaves: LeaveReq[] = [
  { id: "L001", name: "Priya Patel", type: "Sick Leave", days: 3, from: "2024-03-18", to: "2024-03-20", reason: "Flu recovery", status: "pending" },
  { id: "L002", name: "Tom Brown", type: "Vacation", days: 5, from: "2024-03-25", to: "2024-03-29", reason: "Family trip", status: "pending" },
  { id: "L003", name: "Anna Lee", type: "Personal", days: 1, from: "2024-03-15", to: "2024-03-15", reason: "Personal errand", status: "approved" },
];

const initialDepts: Department[] = [
  { name: "Engineering", manager: "Sarah Chen", employees: 18, budget: "$420K" },
  { name: "Marketing", manager: "James Wilson", employees: 8, budget: "$180K" },
  { name: "Finance", manager: "Unassigned", employees: 6, budget: "$150K" },
  { name: "Operations", manager: "Mike Johnson", employees: 9, budget: "$210K" },
  { name: "HR", manager: "Lisa Kumar", employees: 4, budget: "$120K" },
];

const HRDashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [leaves, setLeaves] = useState<LeaveReq[]>(initialLeaves);
  const [depts, setDepts] = useState<Department[]>(initialDepts);
  const [onboardOpen, setOnboardOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState<string | null>(null);
  const [newEmp, setNewEmp] = useState({ name: "", email: "", dept: "Engineering", role: "" });
  const [newManager, setNewManager] = useState("");

  const handleLeave = (id: string, status: "approved" | "rejected") => {
    setLeaves(leaves.map((l) => (l.id === id ? { ...l, status } : l)));
    toast.success(`Leave request ${status}`);
  };

  const handleOnboard = () => {
    if (!newEmp.name || !newEmp.email || !newEmp.role) {
      toast.error("Please fill all fields");
      return;
    }
    const emp: Employee = {
      id: `E${String(employees.length + 1).padStart(3, "0")}`,
      ...newEmp,
      status: "Onboarding",
      joined: new Date().toISOString().slice(0, 10),
    };
    setEmployees([emp, ...employees]);
    setNewEmp({ name: "", email: "", dept: "Engineering", role: "" });
    setOnboardOpen(false);
    toast.success(`${emp.name} onboarded successfully`);
  };

  const handleAssignManager = (deptName: string) => {
    if (!newManager) return;
    setDepts(depts.map((d) => (d.name === deptName ? { ...d, manager: newManager } : d)));
    setAssignOpen(null);
    setNewManager("");
    toast.success(`Manager assigned to ${deptName}`);
  };

  const stats = [
    { title: "Total Employees", value: employees.length, icon: Users, trend: "+3 this month", color: "from-primary to-primary-glow" },
    { title: "Active", value: employees.filter((e) => e.status === "Active").length, icon: UserCheck, trend: "93% attendance", color: "from-success to-success/70" },
    { title: "On Leave", value: employees.filter((e) => e.status === "On Leave").length, icon: Clock, trend: "Approved", color: "from-warning to-warning/70" },
    { title: "Pending Leaves", value: leaves.filter((l) => l.status === "pending").length, icon: Briefcase, trend: "Needs review", color: "from-info to-info/70" },
  ];

  const initials = (name: string) => name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">Human Resources</p>
          <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">People Operations</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your team, leaves, and department structure.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={onboardOpen} onOpenChange={setOnboardOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-primary-foreground hover-lift">
                <UserPlus className="w-4 h-4 mr-1.5" /> Onboard Employee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">Onboard new employee</DialogTitle>
                <DialogDescription>Add a new team member to your organization.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label>Full name</Label>
                  <Input value={newEmp.name} onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })} placeholder="Jane Smith" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={newEmp.email} onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })} placeholder="jane@company.com" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select value={newEmp.dept} onValueChange={(v) => setNewEmp({ ...newEmp, dept: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {depts.map((d) => <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input value={newEmp.role} onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })} placeholder="Sr. Developer" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOnboardOpen(false)}>Cancel</Button>
                <Button onClick={handleOnboard} className="gradient-primary text-primary-foreground">Onboard</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.title} className="shadow-card hover-lift border-border/60 overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-soft`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{s.title}</p>
              <p className="font-display text-3xl font-bold text-foreground mt-1">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/60 p-1 h-11">
          <TabsTrigger value="overview" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">Overview</TabsTrigger>
          <TabsTrigger value="employees" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">Employees</TabsTrigger>
          <TabsTrigger value="leaves" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
            Leave Management
            {leaves.filter((l) => l.status === "pending").length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 px-1.5 text-[10px]">
                {leaves.filter((l) => l.status === "pending").length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="departments" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">Departments</TabsTrigger>
        </TabsList>

        {/* Overview tab */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2 shadow-card border-border/60">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-display">Weekly Attendance</CardTitle>
                    <CardDescription className="text-xs">Present vs absent across the week</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">This week</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={initialAttendance} barGap={6}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="day" fontSize={11} stroke="hsl(var(--muted-foreground))" axisLine={false} tickLine={false} />
                    <YAxis fontSize={11} stroke="hsl(var(--muted-foreground))" axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                    <Bar dataKey="present" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="absent" fill="hsl(var(--destructive) / 0.7)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border/60">
              <CardHeader>
                <CardTitle className="text-base font-display">Department Headcount</CardTitle>
                <CardDescription className="text-xs">Distribution by team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {depts.map((d) => {
                  const pct = (d.employees / employees.length) * 100;
                  return (
                    <div key={d.name} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">{d.name}</span>
                        <span className="text-muted-foreground">{d.employees}</span>
                      </div>
                      <Progress value={pct} className="h-1.5" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Employees tab */}
        <TabsContent value="employees" className="mt-4">
          <Card className="shadow-card border-border/60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-display">Employee Directory</CardTitle>
                  <CardDescription className="text-xs">Complete overview of your workforce</CardDescription>
                </div>
                <Badge variant="secondary">{employees.length} members</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground text-left text-xs uppercase tracking-wider">
                      <th className="pb-3 font-medium">Employee</th>
                      <th className="pb-3 font-medium">Role</th>
                      <th className="pb-3 font-medium">Department</th>
                      <th className="pb-3 font-medium">Joined</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((e) => (
                      <tr key={e.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-9 h-9">
                              <AvatarFallback className="gradient-primary text-white text-xs">{initials(e.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{e.name}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> {e.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-muted-foreground">{e.role}</td>
                        <td className="py-3 text-muted-foreground">{e.dept}</td>
                        <td className="py-3 text-muted-foreground text-xs">{e.joined}</td>
                        <td className="py-3">
                          <Badge
                            variant="outline"
                            className={
                              e.status === "Active"
                                ? "border-success/30 bg-success/10 text-success"
                                : e.status === "Onboarding"
                                ? "border-info/30 bg-info/10 text-info"
                                : "border-warning/30 bg-warning/10 text-warning"
                            }
                          >
                            {e.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leaves tab */}
        <TabsContent value="leaves" className="mt-4">
          <Card className="shadow-card border-border/60">
            <CardHeader>
              <CardTitle className="text-base font-display">Leave Requests</CardTitle>
              <CardDescription className="text-xs">Review and manage time-off requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaves.map((lr) => (
                <div key={lr.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-colors">
                  <div className="flex items-start gap-3 flex-1">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="gradient-primary text-white text-xs">{initials(lr.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-sm text-foreground">{lr.name}</p>
                        <Badge variant="secondary" className="text-[10px] h-5">{lr.type}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {lr.from} → {lr.to} · {lr.days} days
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 italic">"{lr.reason}"</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {lr.status === "pending" ? (
                      <>
                        <Button size="sm" variant="outline" className="h-8 text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/10" onClick={() => handleLeave(lr.id, "rejected")}>
                          <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                        </Button>
                        <Button size="sm" className="h-8 bg-success hover:bg-success/90 text-success-foreground" onClick={() => handleLeave(lr.id, "approved")}>
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                        </Button>
                      </>
                    ) : (
                      <Badge
                        className={lr.status === "approved" ? "bg-success/15 text-success border-success/30" : "bg-destructive/15 text-destructive border-destructive/30"}
                        variant="outline"
                      >
                        {lr.status === "approved" ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                        {lr.status}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Departments tab */}
        <TabsContent value="departments" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {depts.map((d) => (
              <Card key={d.name} className="shadow-card border-border/60 hover-lift">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">{d.budget}</Badge>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">{d.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{d.employees} team members</p>
                  </div>
                  <div className="pt-3 border-t border-border space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Manager</p>
                      <p className={`text-sm font-medium mt-0.5 ${d.manager === "Unassigned" ? "text-warning" : "text-foreground"}`}>
                        {d.manager}
                      </p>
                    </div>
                    <Dialog open={assignOpen === d.name} onOpenChange={(o) => setAssignOpen(o ? d.name : null)}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="w-full">
                          <UserCheck className="w-3.5 h-3.5 mr-1.5" />
                          {d.manager === "Unassigned" ? "Assign Manager" : "Reassign Manager"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="font-display">Assign manager to {d.name}</DialogTitle>
                          <DialogDescription>Select an employee to manage this department.</DialogDescription>
                        </DialogHeader>
                        <div className="py-2">
                          <Label>Manager</Label>
                          <Select value={newManager} onValueChange={setNewManager}>
                            <SelectTrigger className="mt-2"><SelectValue placeholder="Select an employee" /></SelectTrigger>
                            <SelectContent>
                              {employees.filter((e) => e.status === "Active").map((e) => (
                                <SelectItem key={e.id} value={e.name}>{e.name} — {e.role}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setAssignOpen(null)}>Cancel</Button>
                          <Button onClick={() => handleAssignManager(d.name)} className="gradient-primary text-primary-foreground">Assign</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRDashboard;
