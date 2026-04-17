import {
  LayoutDashboard,
  DollarSign,
  Users,
  FileText,
  Settings,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Finance", url: "/dashboard/finance", icon: DollarSign },
  { title: "HR", url: "/dashboard/hr", icon: Users },
  { title: "Reports", url: "/dashboard/reports", icon: FileText },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-glow to-sidebar-primary flex items-center justify-center shrink-0 shadow-glow">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-lg text-sidebar-foreground">FinHR</span>
              <span className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50">Suite</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40 px-3">
              Workspace
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="rounded-lg transition-all text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      activeClassName="!bg-sidebar-accent !text-sidebar-foreground font-medium relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-sidebar-primary before:rounded-r"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {!collapsed && (
        <SidebarFooter className="p-3">
          <div className="rounded-xl bg-gradient-to-br from-sidebar-accent to-sidebar-accent/40 p-4 border border-sidebar-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-xs font-semibold text-sidebar-foreground">Pro Plan</span>
            </div>
            <p className="text-[11px] text-sidebar-foreground/60 leading-relaxed">
              Unlock advanced reports and unlimited users.
            </p>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
