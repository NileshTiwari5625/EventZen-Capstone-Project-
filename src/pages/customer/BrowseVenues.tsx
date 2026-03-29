import { useState } from "react";
import { venueService, bookingService, type Venue } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Users, Star, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CrudDialog from "@/components/CrudDialog";

const BrowseVenues = () => {
  const [venues] = useState<Venue[]>(venueService.getAll());
  const [search, setSearch] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [bookingForm, setBookingForm] = useState({ event: "", date: "" });
  const { toast } = useToast();

  const filtered = venues.filter(v => v.name.toLowerCase().includes(search.toLowerCase()) || v.location.toLowerCase().includes(search.toLowerCase()));

  const openBooking = (v: Venue) => { setSelectedVenue(v); setBookingForm({ event: "", date: "" }); setBookingOpen(true); };

  const handleBook = () => {
    if (selectedVenue) {
      bookingService.create({
        venue: selectedVenue.name,
        event: bookingForm.event,
        date: bookingForm.date,
        status: "pending",
        total: selectedVenue.pricePerDay,
      });
      toast({ title: "Booking submitted!", description: `${selectedVenue.name} for "${bookingForm.event}"` });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Browse Venues</h1>
        <p className="text-muted-foreground text-sm">Find the perfect venue for your event</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by name or location..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(v => (
          <Card key={v.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <CardContent className="pt-4 space-y-3">
              <div>
                <h3 className="font-heading font-semibold text-lg">{v.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{v.location}</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{v.capacity}</span>
                <span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning fill-warning" />{v.rating}</span>
                <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{v.pricePerDay.toLocaleString()}/day</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {v.amenities.map(a => <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>)}
              </div>
              <Button className="w-full gradient-primary text-primary-foreground border-0" onClick={() => openBooking(v)}>
                Book Venue
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <CrudDialog open={bookingOpen} onOpenChange={setBookingOpen} title="Book Venue" description={`Reserve ${selectedVenue?.name} — $${selectedVenue?.pricePerDay.toLocaleString()}/day`} onSubmit={handleBook} submitLabel="Submit Booking">
        <div className="space-y-2"><Label>Event Name</Label><Input value={bookingForm.event} onChange={e => setBookingForm({ ...bookingForm, event: e.target.value })} placeholder="My event" /></div>
        <div className="space-y-2"><Label>Date</Label><Input type="date" value={bookingForm.date} onChange={e => setBookingForm({ ...bookingForm, date: e.target.value })} /></div>
      </CrudDialog>
    </div>
  );
};

export default BrowseVenues;
