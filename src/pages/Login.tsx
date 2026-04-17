import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp, countries, Role } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, BarChart3, Users, Shield, ArrowRight, CheckCircle2 } from "lucide-react";

const Login = () => {
  const { setRole, setCountry, setIsLoggedIn, country } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>("finance");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden items-center justify-center p-12">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }} />
        </div>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-glow/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative z-10 max-w-md space-y-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-white">FinHR Suite</h2>
              <p className="text-white/50 text-xs uppercase tracking-widest">Enterprise Edition</p>
            </div>
          </div>

          <div className="space-y-5">
            <h1 className="font-display text-5xl font-bold text-white leading-[1.1] tracking-tight">
              Run finance & people ops, beautifully.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              The trusted platform for modern teams to manage payroll, expenses, and employees — all in one elegant workspace.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              "Real-time P&L and expense tracking",
              "End-to-end employee lifecycle management",
              "Multi-currency support across regions",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-white/80 text-sm">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                {feature}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 pt-6 border-t border-white/10">
            {[
              { icon: TrendingUp, label: "Finance" },
              { icon: Users, label: "HR" },
              { icon: Shield, label: "Secure" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/60 text-xs">
                <Icon className="w-4 h-4" /> {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="w-full max-w-md space-y-8 relative animate-slide-up">
          <div className="space-y-2">
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">FinHR Suite</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground">Sign in to your workspace to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 bg-card"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Password</Label>
                <button type="button" className="text-xs text-primary hover:underline">Forgot?</button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 bg-card"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Country</Label>
                <Select
                  value={country.code}
                  onValueChange={(v) => setCountry(countries.find((c) => c.code === v)!)}
                >
                  <SelectTrigger className="h-11 bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Role</Label>
                <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as Role)}>
                  <SelectTrigger className="h-11 bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-95 hover-lift group">
              Sign In to Dashboard
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Demo mode — enter any credentials to continue
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
