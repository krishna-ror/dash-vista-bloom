import { useApp, countries, Role } from "@/contexts/AppContext";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, ChevronDown, LogOut, Search, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const { role, setRole, country, setCountry, setIsLoggedIn } = useApp();
  const navigate = useNavigate();

  const roleLabels: Record<Role, string> = {
    finance: "Finance",
    hr: "Human Resources",
    management: "Management",
  };

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3 flex-1">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="hidden md:flex items-center relative max-w-sm flex-1">
          <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
          <Input
            placeholder="Search anything..."
            className="pl-9 h-9 bg-muted/40 border-transparent focus-visible:bg-card focus-visible:border-border"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Switcher */}
        <Select value={role} onValueChange={(v) => setRole(v as Role)}>
          <SelectTrigger className="w-auto h-9 text-xs gap-2 bg-accent border-accent font-medium">
            <span className="hidden sm:inline text-muted-foreground font-normal">Role:</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="hr">Human Resources</SelectItem>
            <SelectItem value="management">Management</SelectItem>
          </SelectContent>
        </Select>

        {/* Country Switcher */}
        <Select value={country.code} onValueChange={(v) => setCountry(countries.find((c) => c.code === v)!)}>
          <SelectTrigger className="w-auto h-9 text-xs gap-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {countries.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                {c.flag} {c.name} · {c.currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Notifications">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-card" />
        </button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-muted p-1 pr-2 rounded-xl transition-colors">
            <Avatar className="w-9 h-9 ring-2 ring-border">
              <AvatarFallback className="gradient-primary text-white text-xs font-semibold">JD</AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-xs font-semibold text-foreground">John Doe</span>
              <span className="text-[10px] text-muted-foreground">{roleLabels[role]}</span>
            </div>
            <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">John Doe</span>
                <span className="text-xs text-muted-foreground">john@company.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><User className="w-4 h-4 mr-2" /> Profile</DropdownMenuItem>
            <DropdownMenuItem><Settings className="w-4 h-4 mr-2" /> Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { setIsLoggedIn(false); navigate("/"); }} className="text-destructive focus:text-destructive">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopNavbar;
