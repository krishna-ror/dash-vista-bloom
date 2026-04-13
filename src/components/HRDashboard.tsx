import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, Clock, UserPlus, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const attendanceData = [
  { day: "Mon", present: 42, absent: 3 },
  { day: "Tue", present: 44, absent: 1 },
  { day: "Wed", present: 40, absent: 5 },
  { day: "Thu", present: 43, absent: 2 },
  { day: "Fri", present: 38, absent: 7 },
];

const employees = [
  { name: "Sarah Chen", dept: "Engineering", status: "Active", role: "Sr. Developer" },
  { name: "James Wilson", dept: "Marketing", status: "Active", role: "Marketing Lead" },
  { name: "Priya Patel", dept: "Finance", status: "On Leave", role: "Accountant" },
  { name: "Mike Johnson", dept: "Operations", status: "Active", role: "Ops Manager" },
  { name: "Lisa Kumar", dept: "HR", status: "Active", role: "HR Specialist" },
];

const leaveRequests = [
  { name: "Priya Patel", type: "Sick Leave", days: 3, status: "pending" },
  { name: "Tom Brown", type: "Vacation", days: 5, status: "pending" },
  { name: "Anna Lee", type: "Personal", days: 1, status: "approved" },
];

const HRDashboard = () => {
  const stats = [
    { title: "Total Employees", value: "45", icon: Users, color: "text-primary" },
    { title: "Active", value: "42", icon: UserCheck, color: "text-green-600" },
    { title: "On Leave", value: "3", icon: Clock, color: "text-amber-500" },
    { title: "Leave Requests", value: "5", icon: Clock, color: "text-primary" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">HR Dashboard</h1>
          <p className="text-muted-foreground text-sm">Team management and attendance</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="gradient-primary text-white">
            <UserPlus className="w-4 h-4 mr-1" /> Add Employee
          </Button>
          <Button size="sm" variant="outline">
            <CheckCircle className="w-4 h-4 mr-1" /> Approve Leave
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.title} className="shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{s.title}</span>
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attendance */}
        <Card className="shadow-soft">
          <CardHeader><CardTitle className="text-base">Weekly Attendance</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 20% 90%)" />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="present" fill="hsl(245 58% 51%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill="hsl(0 84% 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Leave Requests */}
        <Card className="shadow-soft">
          <CardHeader><CardTitle className="text-base">Leave Requests</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {leaveRequests.map((lr, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium text-sm text-foreground">{lr.name}</p>
                  <p className="text-xs text-muted-foreground">{lr.type} · {lr.days} days</p>
                </div>
                <Badge variant={lr.status === "approved" ? "default" : "secondary"} className="text-xs">
                  {lr.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Employee Table */}
      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base">Employee Directory</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-left">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Role</th>
                  <th className="pb-3 font-medium">Department</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr key={e.name} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-medium">{e.name}</td>
                    <td className="py-3 text-muted-foreground">{e.role}</td>
                    <td className="py-3 text-muted-foreground">{e.dept}</td>
                    <td className="py-3">
                      <Badge variant={e.status === "Active" ? "default" : "secondary"} className="text-xs">
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
    </div>
  );
};

export default HRDashboard;
