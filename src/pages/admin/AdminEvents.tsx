import { useState } from "react";
import { eventService, type Event } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Calendar, Users, DollarSign, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CrudDialog from "@/components/CrudDialog";

const statusColors = {
  upcoming: "bg-primary/10 text-primary border-primary/20",
  planning: "bg-warning/10 text-warning border-warning/20",
  completed: "bg-success/10 text-success border-success/20",
};

const emptyEvent: Omit<Event, "id"> = { title: "", date: "", venue: "", status: "planning", attendees: 0, budget: 0 };

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[]>(eventService.getAll());
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState(emptyEvent);
  const { toast } = useToast();

  const filtered = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

  const refresh = () => setEvents(eventService.getAll());

  const openCreate = () => { setEditing(null); setForm(emptyEvent); setDialogOpen(true); };
  const openEdit = (e: Event) => { setEditing(e); setForm({ title: e.title, date: e.date, venue: e.venue, status: e.status, attendees: e.attendees, budget: e.budget }); setDialogOpen(true); };
  const openDelete = (e: Event) => { setEditing(e); setDeleteOpen(true); };

  const handleSave = () => {
    if (editing) {
      eventService.update(editing.id, form);
      toast({ title: "Event updated!" });
    } else {
      eventService.create(form);
      toast({ title: "Event created!" });
    }
    refresh();
  };

  const handleDelete = () => {
    if (editing) {
      eventService.delete(editing.id);
      toast({ title: "Event deleted", variant: "destructive" });
      refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Event Management</h1>
          <p className="text-muted-foreground text-sm">Manage all your events</p>
        </div>
        <Button className="gradient-primary text-primary-foreground border-0 gap-2" onClick={openCreate}>
          <Plus className="h-4 w-4" /> New Event
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Events", value: events.length, icon: Calendar },
          { label: "Upcoming", value: events.filter(e => e.status === "upcoming").length, icon: Calendar },
          { label: "Total Attendees", value: events.reduce((s, e) => s + e.attendees, 0).toLocaleString(), icon: Users },
          { label: "Total Budget", value: `$${(events.reduce((s, e) => s + e.budget, 0) / 1000).toFixed(0)}K`, icon: DollarSign },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-heading font-bold">{stat.value}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <CardTitle className="font-heading">All Events</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search events..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(event => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-muted-foreground">{event.venue}</TableCell>
                  <TableCell>{event.attendees}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[event.status]}>{event.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">${event.budget.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(event)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => openDelete(event)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <CrudDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editing ? "Edit Event" : "Create Event"} description={editing ? "Update event details" : "Add a new event"} onSubmit={handleSave}>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Event title" />
        </div>
        <div className="space-y-2">
          <Label>Date</Label>
          <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Venue</Label>
          <Input value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} placeholder="Venue name" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Attendees</Label>
            <Input type="number" value={form.attendees} onChange={e => setForm({ ...form, attendees: Number(e.target.value) })} />
          </div>
          <div className="space-y-2">
            <Label>Budget ($)</Label>
            <Input type="number" value={form.budget} onChange={e => setForm({ ...form, budget: Number(e.target.value) })} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={form.status} onValueChange={v => setForm({ ...form, status: v as Event["status"] })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CrudDialog>

      {/* Delete Dialog */}
      <CrudDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Delete Event" description={`Are you sure you want to delete "${editing?.title}"?`} onSubmit={handleDelete} submitLabel="Delete" variant="destructive">
        <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
      </CrudDialog>
    </div>
  );
};

export default AdminEvents;
