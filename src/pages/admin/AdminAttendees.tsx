import { useState } from "react";
import { attendeeService, type Attendee } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CrudDialog from "@/components/CrudDialog";

const statusColors = {
  confirmed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const emptyAttendee: Omit<Attendee, "id"> = { name: "", email: "", event: "", status: "pending", ticketType: "General" };

const AdminAttendees = () => {
  const [attendees, setAttendees] = useState<Attendee[]>(attendeeService.getAll());
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Attendee | null>(null);
  const [form, setForm] = useState(emptyAttendee);
  const { toast } = useToast();

  const filtered = attendees.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));
  const refresh = () => setAttendees(attendeeService.getAll());

  const openCreate = () => { setEditing(null); setForm(emptyAttendee); setDialogOpen(true); };
  const openEdit = (a: Attendee) => { setEditing(a); setForm({ name: a.name, email: a.email, event: a.event, status: a.status, ticketType: a.ticketType }); setDialogOpen(true); };
  const openDelete = (a: Attendee) => { setEditing(a); setDeleteOpen(true); };

  const handleSave = () => {
    if (editing) { attendeeService.update(editing.id, form); toast({ title: "Attendee updated!" }); }
    else { attendeeService.create(form); toast({ title: "Attendee added!" }); }
    refresh();
  };

  const handleDelete = () => { if (editing) { attendeeService.delete(editing.id); toast({ title: "Attendee removed", variant: "destructive" }); refresh(); } };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Attendee Management</h1>
          <p className="text-muted-foreground text-sm">Track registrations and guest lists</p>
        </div>
        <Button className="gradient-primary text-primary-foreground border-0 gap-2" onClick={openCreate}>
          <Plus className="h-4 w-4" /> Add Attendee
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <CardTitle className="font-heading">All Attendees ({attendees.length})</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search attendees..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Ticket</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(a => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell className="text-muted-foreground">{a.email}</TableCell>
                  <TableCell>{a.event}</TableCell>
                  <TableCell><Badge variant="outline">{a.ticketType}</Badge></TableCell>
                  <TableCell><Badge variant="outline" className={statusColors[a.status]}>{a.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(a)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => openDelete(a)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CrudDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editing ? "Edit Attendee" : "Add Attendee"} onSubmit={handleSave}>
        <div className="space-y-2"><Label>Full Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" /></div>
        <div className="space-y-2"><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" /></div>
        <div className="space-y-2"><Label>Event</Label><Input value={form.event} onChange={e => setForm({ ...form, event: e.target.value })} placeholder="Event name" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Ticket Type</Label>
            <Select value={form.ticketType} onValueChange={v => setForm({ ...form, ticketType: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="VIP">VIP</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={form.status} onValueChange={v => setForm({ ...form, status: v as Attendee["status"] })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CrudDialog>

      <CrudDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Remove Attendee" description={`Remove "${editing?.name}"?`} onSubmit={handleDelete} submitLabel="Remove" variant="destructive">
        <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
      </CrudDialog>
    </div>
  );
};

export default AdminAttendees;
