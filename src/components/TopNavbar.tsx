import { useApp, countries, Role } from "@/contexts/AppContext";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, ChevronDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const { role, setRole, country, setCountry, setIsLoggedIn } = useApp();
  const navigate = useNavigate();

  const roleLabels: Record<Role, string> = {
    finance: "Finance",
    hr: "HR",
    management: "Management",
  };

  return (
    <header className="h-14 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <span>{country.flag}</span>
          <span>{country.name}</span>
          <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{country.currency}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Role Switcher */}
        <Select value={role} onValueChange={(v) => setRole(v as Role)}>
          <SelectTrigger className="w-auto h-8 text-xs gap-1 border-primary/20 bg-accent">
            <span className="hidden sm:inline text-muted-foreground">Role:</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="hr">HR</SelectItem>
            <SelectItem value="management">Management</SelectItem>
          </SelectContent>
        </Select>

        {/* Country Switcher */}
        <Select value={country.code} onValueChange={(v) => setCountry(countries.find((c) => c.code === v)!)}>
          <SelectTrigger className="w-auto h-8 text-xs gap-1">
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

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-muted p-1 pr-2 rounded-lg transition-colors">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="gradient-primary text-white text-xs font-semibold">JD</AvatarFallback>
            </Avatar>
            <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-xs text-muted-foreground cursor-default">
              john@company.com
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs font-medium">
              <Badge variant="secondary" className="text-xs">{roleLabels[role]}</Badge>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setIsLoggedIn(false); navigate("/"); }}>
              <LogOut className="w-3 h-3 mr-2" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopNavbar;
