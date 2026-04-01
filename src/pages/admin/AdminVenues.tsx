import { useState } from "react";
import { venueService, type Venue } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MapPin, Star, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CrudDialog from "@/components/CrudDialog";

const emptyVenue = { name: "", location: "", capacity: 0, pricePerDay: 0, rating: 0, image: "", amenities: [] as string[] };

const AdminVenues = () => {
  const [venues, setVenues] = useState<Venue[]>(venueService.getAll());
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Venue | null>(null);
  const [form, setForm] = useState(emptyVenue);
  const [amenityInput, setAmenityInput] = useState("");
  const { toast } = useToast();

  const filtered = venues.filter(v => v.name.toLowerCase().includes(search.toLowerCase()));
  const refresh = () => setVenues(venueService.getAll());

  const openCreate = () => { setEditing(null); setForm(emptyVenue); setAmenityInput(""); setDialogOpen(true); };
  const openEdit = (v: Venue) => { setEditing(v); setForm({ name: v.name, location: v.location, capacity: v.capacity, pricePerDay: v.pricePerDay, rating: v.rating, image: v.image, amenities: v.amenities }); setAmenityInput(v.amenities.join(", ")); setDialogOpen(true); };
  const openDelete = (v: Venue) => { setEditing(v); setDeleteOpen(true); };

  const handleSave = () => {
    const data = { ...form, amenities: amenityInput.split(",").map(a => a.trim()).filter(Boolean) };
    if (editing) { venueService.update(editing.id, data); toast({ title: "Venue updated!" }); }
    else { venueService.create(data); toast({ title: "Venue created!" }); }
    refresh();
  };

  const handleDelete = () => { if (editing) { venueService.delete(editing.id); toast({ title: "Venue deleted", variant: "destructive" }); refresh(); } };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Venue Management</h1>
          <p className="text-muted-foreground text-sm">Manage venues and their availability</p>
        </div>
        <Button className="gradient-primary text-primary-foreground border-0 gap-2" onClick={openCreate}>
          <Plus className="h-4 w-4" /> Add Venue
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <CardTitle className="font-heading">All Venues ({venues.length})</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search venues..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Venue</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Price/Day</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Amenities</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(v => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.name}</TableCell>
                  <TableCell className="text-muted-foreground"><span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{v.location}</span></TableCell>
                  <TableCell>{v.capacity.toLocaleString()}</TableCell>
                  <TableCell>${v.pricePerDay.toLocaleString()}</TableCell>
                  <TableCell><span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning fill-warning" />{v.rating}</span></TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {v.amenities.slice(0, 2).map(a => <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>)}
                      {v.amenities.length > 2 && <Badge variant="secondary" className="text-xs">+{v.amenities.length - 2}</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(v)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => openDelete(v)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CrudDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editing ? "Edit Venue" : "Add Venue"} description={editing ? "Update venue details" : "Add a new venue"} onSubmit={handleSave}>
        <div className="space-y-2"><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Venue name" /></div>
        <div className="space-y-2"><Label>Location</Label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="City, State" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Capacity</Label><Input type="number" value={form.capacity} onChange={e => setForm({ ...form, capacity: Number(e.target.value) })} /></div>
          <div className="space-y-2"><Label>Price/Day ($)</Label><Input type="number" value={form.pricePerDay} onChange={e => setForm({ ...form, pricePerDay: Number(e.target.value) })} /></div>
        </div>
        <div className="space-y-2"><Label>Image URL</Label><Input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." /></div>
        <div className="space-y-2"><Label>Amenities (comma-separated)</Label><Input value={amenityInput} onChange={e => setAmenityInput(e.target.value)} placeholder="WiFi, Parking, Catering" /></div>
      </CrudDialog>

      <CrudDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Delete Venue" description={`Delete "${editing?.name}"?`} onSubmit={handleDelete} submitLabel="Delete" variant="destructive">
        <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
      </CrudDialog>
    </div>
  );
};

export default AdminVenues;
