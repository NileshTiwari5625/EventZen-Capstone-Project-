export const mockEvents = [
  { id: "1", title: "Tech Conference 2026", date: "2026-05-15", venue: "Grand Convention Center", status: "upcoming" as const, attendees: 350, budget: 25000 },
  { id: "2", title: "Summer Music Festival", date: "2026-07-20", venue: "Riverside Park Amphitheater", status: "planning" as const, attendees: 1200, budget: 75000 },
  { id: "3", title: "Corporate Gala Night", date: "2026-04-10", venue: "The Ritz Ballroom", status: "upcoming" as const, attendees: 200, budget: 45000 },
  { id: "4", title: "Startup Pitch Day", date: "2026-03-01", venue: "Innovation Hub", status: "completed" as const, attendees: 80, budget: 5000 },
  { id: "5", title: "Wedding Expo", date: "2026-06-08", venue: "Crystal Palace", status: "planning" as const, attendees: 500, budget: 30000 },
];

export const mockVenues = [
  { id: "1", name: "Jio World Convention Centre", location: "BKC, Mumbai", capacity: 3000, pricePerDay: 450000, rating: 4.9, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop", amenities: ["WiFi", "AV System", "Parking", "Catering"] },
  { id: "2", name: "Palace Grounds", location: "Bengaluru", capacity: 5000, pricePerDay: 350000, rating: 4.7, image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop", amenities: ["Open Air", "Stage", "Parking"] },
  { id: "3", name: "The Leela Ambience Convention", location: "New Delhi", capacity: 2000, pricePerDay: 400000, rating: 4.8, image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=250&fit=crop", amenities: ["Luxury", "Catering", "Valet", "AV System"] },
  { id: "4", name: "HITEX Exhibition Center", location: "Hyderabad", capacity: 3500, pricePerDay: 320000, rating: 4.6, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop", amenities: ["WiFi", "Projector", "Exhibition Hall"] },
  { id: "5", name: "Chennai Trade Centre", location: "Nandambakkam, Chennai", capacity: 2800, pricePerDay: 300000, rating: 4.5, image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=250&fit=crop", amenities: ["Convention Halls", "Parking", "Catering"] },
  { id: "6", name: "Biswa Bangla Convention Centre", location: "Kolkata", capacity: 2500, pricePerDay: 280000, rating: 4.6, image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=250&fit=crop", amenities: ["Rooftop", "City View", "Premium Lounge"] },
];

export const mockAttendees = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", event: "Tech Conference 2026", status: "confirmed" as const, ticketType: "VIP" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", event: "Tech Conference 2026", status: "pending" as const, ticketType: "General" },
  { id: "3", name: "Carol Williams", email: "carol@example.com", event: "Corporate Gala Night", status: "confirmed" as const, ticketType: "VIP" },
  { id: "4", name: "David Brown", email: "david@example.com", event: "Summer Music Festival", status: "confirmed" as const, ticketType: "General" },
  { id: "5", name: "Eva Martinez", email: "eva@example.com", event: "Wedding Expo", status: "cancelled" as const, ticketType: "General" },
];

export const mockVendors = [
  { id: "1", name: "Gourmet Catering Co.", category: "Catering", contact: "info@gourmetcatering.com", rating: 4.9, events: 45 },
  { id: "2", name: "SoundWave Productions", category: "AV & Sound", contact: "hello@soundwave.com", rating: 4.7, events: 32 },
  { id: "3", name: "Bloom & Petal Florals", category: "Decoration", contact: "orders@bloompetal.com", rating: 4.8, events: 58 },
  { id: "4", name: "SnapShot Studios", category: "Photography", contact: "book@snapshot.com", rating: 4.6, events: 27 },
  { id: "5", name: "SafeGuard Security", category: "Security", contact: "ops@safeguard.com", rating: 4.5, events: 63 },
];

export const mockBookings = [
  { id: "1", venue: "Grand Convention Center", event: "Team Building Day", date: "2026-05-20", status: "confirmed" as const, total: 5000 },
  { id: "2", venue: "Skyline Rooftop", event: "Birthday Party", date: "2026-06-15", status: "pending" as const, total: 7000 },
  { id: "3", venue: "Innovation Hub", event: "Workshop", date: "2026-02-01", status: "completed" as const, total: 2000 },
];
