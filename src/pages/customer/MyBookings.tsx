import { useState } from "react";
import { bookingService, type Booking } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarCheck, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CrudDialog from "@/components/CrudDialog";

const statusColors = {
  confirmed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  completed: "bg-primary/10 text-primary border-primary/20",
};

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(bookingService.getAll());
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Booking | null>(null);
  const { toast } = useToast();

  const refresh = () => setBookings(bookingService.getAll());
  const openCancel = (b: Booking) => { setSelected(b); setDeleteOpen(true); };
  const handleCancel = () => {
    if (selected) { bookingService.delete(selected.id); toast({ title: "Booking cancelled", variant: "destructive" }); refresh(); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground text-sm">Track your venue reservations</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Bookings", value: bookings.length },
          { label: "Confirmed", value: bookings.filter(b => b.status === "confirmed").length },
          { label: "Total Spent", value: `$${bookings.reduce((s, b) => s + b.total, 0).toLocaleString()}` },
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-heading font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-primary" /> Booking History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map(b => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.event}</TableCell>
                  <TableCell className="text-muted-foreground">{b.venue}</TableCell>
                  <TableCell>{new Date(b.date).toLocaleDateString()}</TableCell>
                  <TableCell><Badge variant="outline" className={statusColors[b.status]}>{b.status}</Badge></TableCell>
                  <TableCell className="text-right">${b.total.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    {b.status === "pending" && (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => openCancel(b)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CrudDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Cancel Booking" description={`Cancel booking for "${selected?.event}" at ${selected?.venue}?`} onSubmit={handleCancel} submitLabel="Cancel Booking" variant="destructive">
        <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
      </CrudDialog>
    </div>
  );
};

export default MyBookings;
