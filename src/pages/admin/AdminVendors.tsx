import { useState } from "react";
import { vendorService, type Vendor } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Star, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CrudDialog from "@/components/CrudDialog";

const emptyVendor = { name: "", category: "Catering", contact: "", rating: 0, events: 0 };

const AdminVendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>(vendorService.getAll());
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Vendor | null>(null);
  const [form, setForm] = useState(emptyVendor);
  const { toast } = useToast();

  const filtered = vendors.filter(v => v.name.toLowerCase().includes(search.toLowerCase()));
  const refresh = () => setVendors(vendorService.getAll());

  const openCreate = () => { setEditing(null); setForm(emptyVendor); setDialogOpen(true); };
  const openEdit = (v: Vendor) => { setEditing(v); setForm({ name: v.name, category: v.category, contact: v.contact, rating: v.rating, events: v.events }); setDialogOpen(true); };
  const openDelete = (v: Vendor) => { setEditing(v); setDeleteOpen(true); };

  const handleSave = () => {
    if (editing) { vendorService.update(editing.id, form); toast({ title: "Vendor updated!" }); }
    else { vendorService.create(form); toast({ title: "Vendor added!" }); }
    refresh();
  };

  const handleDelete = () => { if (editing) { vendorService.delete(editing.id); toast({ title: "Vendor removed", variant: "destructive" }); refresh(); } };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Vendor Management</h1>
          <p className="text-muted-foreground text-sm">Manage vendor partnerships</p>
        </div>
        <Button className="gradient-primary text-primary-foreground border-0 gap-2" onClick={openCreate}>
          <Plus className="h-4 w-4" /> Add Vendor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <CardTitle className="font-heading">All Vendors ({vendors.length})</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search vendors..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(v => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.name}</TableCell>
                  <TableCell><Badge variant="secondary">{v.category}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{v.contact}</TableCell>
                  <TableCell>{v.events}</TableCell>
                  <TableCell><span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning fill-warning" />{v.rating}</span></TableCell>
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

      <CrudDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editing ? "Edit Vendor" : "Add Vendor"} onSubmit={handleSave}>
        <div className="space-y-2"><Label>Vendor Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Vendor name" /></div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Catering">Catering</SelectItem>
              <SelectItem value="AV & Sound">AV & Sound</SelectItem>
              <SelectItem value="Decoration">Decoration</SelectItem>
              <SelectItem value="Photography">Photography</SelectItem>
              <SelectItem value="Security">Security</SelectItem>
              <SelectItem value="Transportation">Transportation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2"><Label>Contact Email</Label><Input value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} placeholder="vendor@example.com" /></div>
      </CrudDialog>

      <CrudDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Remove Vendor" description={`Remove "${editing?.name}"?`} onSubmit={handleDelete} submitLabel="Remove" variant="destructive">
        <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
      </CrudDialog>
    </div>
  );
};

export default AdminVendors;
