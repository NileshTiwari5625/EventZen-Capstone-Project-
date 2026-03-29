import { useState } from "react";
import { eventService, venueService, attendeeService, vendorService, type Event } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Package, TrendingUp, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--warning))", "hsl(var(--success))", "hsl(var(--destructive))"];

const AdminDashboard = () => {
  const [events] = useState<Event[]>(eventService.getAll());
  const venues = venueService.getAll();
  const attendees = attendeeService.getAll();
  const vendors = vendorService.getAll();

  const totalBudget = events.reduce((s, e) => s + e.budget, 0);
  const totalAttendees = events.reduce((s, e) => s + e.attendees, 0);

  const statusData = [
    { name: "Planning", value: events.filter(e => e.status === "planning").length },
    { name: "Upcoming", value: events.filter(e => e.status === "upcoming").length },
    { name: "Completed", value: events.filter(e => e.status === "completed").length },
  ];

  const budgetData = events.map(e => ({ name: e.title.length > 15 ? e.title.slice(0, 15) + "…" : e.title, budget: e.budget, attendees: e.attendees }));

  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 19000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 45000 },
    { month: "May", revenue: 25000 },
    { month: "Jun", revenue: 30000 },
  ];

  const stats = [
    { label: "Total Events", value: events.length, icon: Calendar, color: "text-primary" },
    { label: "Total Venues", value: venues.length, icon: MapPin, color: "text-accent" },
    { label: "Total Attendees", value: totalAttendees.toLocaleString(), icon: Users, color: "text-success" },
    { label: "Total Budget", value: `$${(totalBudget / 1000).toFixed(0)}K`, icon: DollarSign, color: "text-warning" },
    { label: "Vendors", value: vendors.length, icon: Package, color: "text-destructive" },
    { label: "Avg per Event", value: `$${(totalBudget / (events.length || 1) / 1000).toFixed(0)}K`, icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Overview of your event management platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-2">
                <div className={`h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={v => `$${v / 1000}K`} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Event Status Pie */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Event Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Budget per Event Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">Budget & Attendees by Event</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={v => `$${v / 1000}K`} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Legend />
              <Bar yAxisId="left" dataKey="budget" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Budget ($)" />
              <Bar yAxisId="right" dataKey="attendees" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Attendees" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
