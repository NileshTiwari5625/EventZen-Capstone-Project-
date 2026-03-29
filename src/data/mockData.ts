export const mockEvents = [
  { id: "1", title: "Tech Conference 2026", date: "2026-05-15", venue: "Grand Convention Center", status: "upcoming" as const, attendees: 350, budget: 25000 },
  { id: "2", title: "Summer Music Festival", date: "2026-07-20", venue: "Riverside Park Amphitheater", status: "planning" as const, attendees: 1200, budget: 75000 },
  { id: "3", title: "Corporate Gala Night", date: "2026-04-10", venue: "The Ritz Ballroom", status: "upcoming" as const, attendees: 200, budget: 45000 },
  { id: "4", title: "Startup Pitch Day", date: "2026-03-01", venue: "Innovation Hub", status: "completed" as const, attendees: 80, budget: 5000 },
  { id: "5", title: "Wedding Expo", date: "2026-06-08", venue: "Crystal Palace", status: "planning" as const, attendees: 500, budget: 30000 },
];

export const mockVenues = [
  { id: "1", name: "The Taj Mahal Palace", location: "Colaba, Mumbai", capacity: 1200, pricePerDay: 500000, rating: 4.9, image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=250&fit=crop", amenities: ["Luxury", "Catering", "Valet", "AV System"] },
  { id: "2", name: "JW Marriott Mumbai Juhu", location: "Juhu, Mumbai", capacity: 1300, pricePerDay: 430000, rating: 4.8, image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=250&fit=crop", amenities: ["Sea View", "Luxury", "Valet", "AV System"] },
  { id: "3", name: "The St. Regis Mumbai", location: "Lower Parel, Mumbai", capacity: 900, pricePerDay: 390000, rating: 4.8, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop", amenities: ["Sky Ballroom", "Valet", "WiFi", "Catering"] },
  { id: "4", name: "Sofitel Mumbai BKC", location: "BKC, Mumbai", capacity: 800, pricePerDay: 320000, rating: 4.7, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=250&fit=crop", amenities: ["Banquet Hall", "Business Lounge", "Parking", "AV System"] },
  { id: "5", name: "ITC Gardenia", location: "Residency Road, Bengaluru", capacity: 900, pricePerDay: 340000, rating: 4.8, image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&h=250&fit=crop", amenities: ["WiFi", "Ballroom", "Parking", "In-house Catering"] },
  { id: "6", name: "The Leela Palace Bengaluru", location: "Old Airport Road, Bengaluru", capacity: 1000, pricePerDay: 360000, rating: 4.8, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop", amenities: ["Luxury", "Banquet Hall", "Valet", "AV System"] },
  { id: "7", name: "Shangri-La Bengaluru", location: "Vasanth Nagar, Bengaluru", capacity: 650, pricePerDay: 270000, rating: 4.7, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop", amenities: ["Rooftop", "City View", "Catering", "WiFi"] },
  { id: "8", name: "Sheraton Grand Bengaluru", location: "Whitefield, Bengaluru", capacity: 850, pricePerDay: 285000, rating: 4.6, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=250&fit=crop", amenities: ["Convention Hall", "Parking", "Projector", "Coffee Bar"] },
  { id: "9", name: "The Leela Palace New Delhi", location: "Chanakyapuri, New Delhi", capacity: 950, pricePerDay: 410000, rating: 4.8, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=250&fit=crop", amenities: ["Luxury", "Catering", "Valet", "AV System"] },
  { id: "10", name: "Taj Palace New Delhi", location: "Diplomatic Enclave, New Delhi", capacity: 1200, pricePerDay: 400000, rating: 4.8, image: "https://images.unsplash.com/photo-1474690455603-a369ec1293f9?w=400&h=250&fit=crop", amenities: ["Grand Ballroom", "Valet", "Parking", "WiFi"] },
  { id: "11", name: "Andaz Delhi", location: "Aerocity, New Delhi", capacity: 700, pricePerDay: 300000, rating: 4.7, image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb21007?w=400&h=250&fit=crop", amenities: ["Banquet Hall", "Business Lounge", "Catering", "WiFi"] },
  { id: "12", name: "Roseate House", location: "Aerocity, New Delhi", capacity: 600, pricePerDay: 265000, rating: 4.6, image: "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?w=400&h=250&fit=crop", amenities: ["Rooftop", "AV System", "Valet", "Premium Lounge"] },
  { id: "13", name: "Taj Krishna", location: "Banjara Hills, Hyderabad", capacity: 850, pricePerDay: 295000, rating: 4.7, image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=400&h=250&fit=crop", amenities: ["WiFi", "Projector", "Parking", "Catering"] },
  { id: "14", name: "ITC Kakatiya", location: "Begumpet, Hyderabad", capacity: 750, pricePerDay: 260000, rating: 4.6, image: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400&h=250&fit=crop", amenities: ["Ballroom", "Valet", "Catering", "WiFi"] },
  { id: "15", name: "Novotel Hyderabad Convention Centre", location: "HITEC City, Hyderabad", capacity: 1400, pricePerDay: 330000, rating: 4.7, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop", amenities: ["Convention Hall", "Open Lawn", "Parking", "AV System"] },
  { id: "16", name: "Hyderabad Marriott Hotel", location: "Tank Bund, Hyderabad", capacity: 650, pricePerDay: 245000, rating: 4.5, image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=250&fit=crop", amenities: ["Lake View", "Catering", "WiFi", "Projector"] },
  { id: "17", name: "Hyatt Regency Chennai", location: "Teynampet, Chennai", capacity: 1000, pricePerDay: 310000, rating: 4.6, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop", amenities: ["Ballroom", "Catering", "Parking", "Business Lounge"] },
  { id: "18", name: "ITC Grand Chola", location: "Guindy, Chennai", capacity: 1800, pricePerDay: 460000, rating: 4.8, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop", amenities: ["Grand Ballroom", "Luxury", "Valet", "AV System"] },
  { id: "19", name: "The Leela Palace Chennai", location: "Adyar, Chennai", capacity: 750, pricePerDay: 295000, rating: 4.7, image: "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?w=400&h=250&fit=crop", amenities: ["Sea View", "Catering", "Valet", "WiFi"] },
  { id: "20", name: "Taj Coromandel", location: "Nungambakkam, Chennai", capacity: 700, pricePerDay: 280000, rating: 4.7, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop", amenities: ["Banquet Hall", "Parking", "Projector", "Coffee Bar"] },
  { id: "21", name: "ITC Sonar", location: "EM Bypass, Kolkata", capacity: 1100, pricePerDay: 260000, rating: 4.7, image: "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=400&h=250&fit=crop", amenities: ["Garden Lawn", "Banquet Hall", "Valet", "Premium Lounge"] },
  { id: "22", name: "JW Marriott Kolkata", location: "Science City, Kolkata", capacity: 900, pricePerDay: 290000, rating: 4.7, image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=250&fit=crop", amenities: ["Luxury", "AV System", "Parking", "Catering"] },
  { id: "23", name: "The Oberoi Grand", location: "Dharmatala, Kolkata", capacity: 650, pricePerDay: 235000, rating: 4.6, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop", amenities: ["Heritage Ballroom", "Valet", "WiFi", "Catering"] },
  { id: "24", name: "Taj Bengal", location: "Alipore, Kolkata", capacity: 800, pricePerDay: 275000, rating: 4.7, image: "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=400&h=250&fit=crop", amenities: ["City View", "Banquet Hall", "Parking", "AV System"] },
  { id: "25", name: "The Westin Pune Koregaon Park", location: "Koregaon Park, Pune", capacity: 700, pricePerDay: 240000, rating: 4.6, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=250&fit=crop", amenities: ["Rooftop", "Catering", "Parking", "WiFi"] },
  { id: "26", name: "JW Marriott Pune", location: "Senapati Bapat Road, Pune", capacity: 850, pricePerDay: 285000, rating: 4.7, image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?w=400&h=250&fit=crop", amenities: ["Ballroom", "Valet", "Projector", "Catering"] },
  { id: "27", name: "Conrad Pune", location: "Mangaldas Road, Pune", capacity: 780, pricePerDay: 270000, rating: 4.7, image: "https://images.unsplash.com/photo-1576675784201-0e142b423952?w=400&h=250&fit=crop", amenities: ["Luxury", "Business Lounge", "Parking", "WiFi"] },
  { id: "28", name: "Hyatt Pune", location: "Nagar Road, Pune", capacity: 620, pricePerDay: 220000, rating: 4.5, image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=250&fit=crop", amenities: ["Banquet Hall", "Catering", "AV System", "Coffee Bar"] },
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
