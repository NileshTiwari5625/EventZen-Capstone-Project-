import { useMemo, useState } from "react";
import { venueService, bookingService, type Venue } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Users, Star, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CrudDialog from "@/components/CrudDialog";

const INDIAN_CITIES = ["Mumbai", "Bengaluru", "New Delhi", "Hyderabad", "Chennai", "Kolkata", "Pune"];

const BrowseVenues = () => {
  const [venues] = useState<Venue[]>(venueService.getAll());
  const [search, setSearch] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [bookingForm, setBookingForm] = useState({ event: "", date: "" });
  const { toast } = useToast();

  const cityFiltered = useMemo(() => {
    if (!cityQuery.trim()) return venues;

    const city = cityQuery.trim().toLowerCase();
    return venues.filter(v => v.location.toLowerCase().includes(city));
  }, [venues, cityQuery]);

  const filtered = cityFiltered.filter(v => {
    const term = search.toLowerCase();
    return v.name.toLowerCase().includes(term) || v.location.toLowerCase().includes(term);
  });

  const openBooking = (venue: Venue) => {
    setSelectedVenue(venue);
    setBookingForm({ event: "", date: "" });
    setBookingOpen(true);
  };

  const handleBook = () => {
    if (!selectedVenue) return;

    bookingService.create({
      venue: selectedVenue.name,
      event: bookingForm.event,
      date: bookingForm.date,
      status: "pending",
      total: selectedVenue.pricePerDay,
    });

    toast({ title: "Booking submitted!", description: `${selectedVenue.name} for "${bookingForm.event}"` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Browse Venues</h1>
        <p className="text-muted-foreground text-sm">Enter an Indian city to see popular venues in that city.</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search venue name..."
            className="pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Input
            list="indian-city-list"
            placeholder="Enter Indian city (e.g. Mumbai, Bengaluru)"
            value={cityQuery}
            onChange={e => setCityQuery(e.target.value)}
          />
          <datalist id="indian-city-list">
            {INDIAN_CITIES.map(city => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {INDIAN_CITIES.map(city => (
          <Button key={city} type="button" variant={cityQuery === city ? "default" : "outline"} size="sm" onClick={() => setCityQuery(city)}>
            {city}
          </Button>
        ))}
        <Button type="button" variant="ghost" size="sm" onClick={() => setCityQuery("")}>Clear city</Button>
      </div>

      {cityQuery && (
        <p className="text-sm text-muted-foreground">
          Showing popular venues in <span className="font-medium text-foreground">{cityQuery}</span>.
        </p>
      )}

      {filtered.length === 0 && (
        <Card>
          <CardContent className="py-6 text-sm text-muted-foreground">
            No venues found for this city/query. Try another Indian city such as Mumbai, Bengaluru, Hyderabad, or Chennai.
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(venue => (
          <Card key={venue.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img src={venue.image} alt={venue.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <CardContent className="pt-4 space-y-3">
              <div>
                <h3 className="font-heading font-semibold text-lg">{venue.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{venue.location}</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{venue.capacity}</span>
                <span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning fill-warning" />{venue.rating}</span>
                <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />₹{venue.pricePerDay.toLocaleString()}/day</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {venue.amenities.map(amenity => <Badge key={amenity} variant="secondary" className="text-xs">{amenity}</Badge>)}
              </div>
              <Button className="w-full gradient-primary text-primary-foreground border-0" onClick={() => openBooking(venue)}>
                Book Venue
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <CrudDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        title="Book Venue"
        description={`Reserve ${selectedVenue?.name} — ₹${selectedVenue?.pricePerDay.toLocaleString()}/day`}
        onSubmit={handleBook}
        submitLabel="Submit Booking"
      >
        <div className="space-y-2">
          <Label>Event Name</Label>
          <Input value={bookingForm.event} onChange={e => setBookingForm({ ...bookingForm, event: e.target.value })} placeholder="My event" />
        </div>
        <div className="space-y-2">
          <Label>Date</Label>
          <Input type="date" value={bookingForm.date} onChange={e => setBookingForm({ ...bookingForm, date: e.target.value })} />
        </div>
      </CrudDialog>
    </div>
  );
};

export default BrowseVenues;
