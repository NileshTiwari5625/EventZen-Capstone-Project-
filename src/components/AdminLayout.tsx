import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, Package, Sparkles, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { authService } from "@/services/api";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/events", icon: Calendar, label: "Events" },
  { to: "/admin/venues", icon: MapPin, label: "Venues" },
  { to: "/admin/attendees", icon: Users, label: "Attendees" },
  { to: "/admin/vendors", icon: Package, label: "Vendors" },
];

const AdminLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border hidden md:flex">
        <div className="p-6 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-sidebar-primary" />
          <span className="font-heading text-lg font-bold">EventZen</span>
        </div>
        <span className="px-6 text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider mb-2">Admin Portal</span>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(item => (
            <Link key={item.to} to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                pathname === item.to
                  ? "bg-sidebar-accent text-sidebar-primary font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border space-y-2">
          <div className="flex justify-end">
            <ThemeToggle className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent" />
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent transition-colors">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar/95 text-sidebar-foreground border-b border-sidebar-border backdrop-blur">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-sidebar-primary" />
            <span className="font-heading font-bold">EventZen Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent" />
            <button onClick={handleLogout} className="text-sidebar-foreground/70">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto px-2 pb-2 gap-1">
          {navItems.map(item => (
            <Link key={item.to} to={item.to}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors",
                pathname === item.to ? "bg-sidebar-accent text-sidebar-primary font-medium" : "text-sidebar-foreground/70"
              )}>
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 md:pt-0 pt-24">
        <div className="p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
