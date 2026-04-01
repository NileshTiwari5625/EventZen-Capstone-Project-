import { useMemo, useState } from "react";
import { bookingService, type Booking } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck, CheckCircle2, Circle, Clock3, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CrudDialog from "@/components/CrudDialog";
import { cn } from "@/lib/utils";

type TimelineState = "done" | "active" | "upcoming";

interface TimelineStep {
  label: string;
  note: string;
  state: TimelineState;
}

const statusColors = {
  confirmed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  completed: "bg-primary/10 text-primary border-primary/20",
};

const bookingOrder: Record<Booking["status"], number> = {
  pending: 0,
  confirmed: 1,
  completed: 2,
};

const baseSteps = [
  { label: "Request submitted", note: "Your booking request is received." },
  { label: "Venue review", note: "Venue team reviews date and availability." },
  { label: "Booking confirmed", note: "Reservation is approved and held for your event." },
  { label: "Event day", note: "Venue is prepared and handed over." },
  { label: "Completed", note: "Event finished and booking archived." },
] as const;

const getTimelineSteps = (booking: Booking): TimelineStep[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(booking.date);
  eventDate.setHours(0, 0, 0, 0);

  const reached = (() => {
    if (booking.status === "pending") return 1;
    if (booking.status === "completed") return 4;
    return eventDate <= today ? 3 : 2;
  })();

  return baseSteps.map((step, index) => ({
    ...step,
    state: index < reached ? "done" : index === reached ? "active" : "upcoming",
  }));
};

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(bookingService.getAll());
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Booking | null>(null);
  const { toast } = useToast();

  const refresh = () => setBookings(bookingService.getAll());

  const timelineBookings = useMemo(
    () => [...bookings].sort((a, b) => {
      const statusDiff = bookingOrder[a.status] - bookingOrder[b.status];
      if (statusDiff !== 0) return statusDiff;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }),
    [bookings],
  );

  const openCancel = (b: Booking) => {
    setSelected(b);
    setDeleteOpen(true);
  };

  const handleCancel = () => {
    if (!selected) return;

    bookingService.delete(selected.id);
    toast({ title: "Booking cancelled", variant: "destructive" });
    refresh();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground text-sm">Track your venue booking timeline from request to completion.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-primary" /> Booking Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {timelineBookings.length === 0 && (
            <p className="text-sm text-muted-foreground">You have no bookings yet. Go to Venues to reserve your first one.</p>
          )}

          {timelineBookings.map(booking => (
            <article key={booking.id} className="rounded-lg border p-4 space-y-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-1">
                  <h2 className="font-semibold text-lg leading-none">{booking.event}</h2>
                  <p className="text-sm text-muted-foreground">{booking.venue}</p>
                  <p className="text-sm text-muted-foreground">
                    Event date: {new Date(booking.date).toLocaleDateString()} · Budget: ${booking.total.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={statusColors[booking.status]}>
                    {booking.status}
                  </Badge>
                  {booking.status === "pending" && (
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={() => openCancel(booking)}>
                      <Trash2 className="mr-1 h-3.5 w-3.5" /> Cancel
                    </Button>
                  )}
                </div>
              </div>

              <ol className="space-y-3">
                {getTimelineSteps(booking).map(step => (
                  <li key={step.label} className="flex items-start gap-3">
                    {step.state === "done" && <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />}
                    {step.state === "active" && <Clock3 className="mt-0.5 h-4 w-4 text-warning" />}
                    {step.state === "upcoming" && <Circle className="mt-0.5 h-4 w-4 text-muted-foreground" />}
                    <div>
                      <p className={cn("text-sm font-medium", step.state === "upcoming" && "text-muted-foreground")}>{step.label}</p>
                      <p className="text-xs text-muted-foreground">{step.note}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </CardContent>
      </Card>

      <CrudDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Cancel Booking"
        description={`Cancel booking for "${selected?.event}" at ${selected?.venue}?`}
        onSubmit={handleCancel}
        submitLabel="Cancel Booking"
        variant="destructive"
      >
        <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
      </CrudDialog>
    </div>
  );
};

export default MyBookings;
