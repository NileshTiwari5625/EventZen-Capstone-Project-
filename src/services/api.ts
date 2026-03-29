// API Service Layer — ready to connect to a real backend (Node.js/Spring Boot)
// Currently uses localStorage for persistence. Replace BASE_URL with your backend URL.

const BASE_URL = "/api"; // Change to your backend URL e.g. "http://localhost:8080/api"

// ============ Types ============
export interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  status: "upcoming" | "planning" | "completed";
  attendees: number;
  budget: number;
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  pricePerDay: number;
  rating: number;
  image: string;
  amenities: string[];
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  event: string;
  status: "confirmed" | "pending" | "cancelled";
  ticketType: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  contact: string;
  rating: number;
  events: number;
}

export interface Booking {
  id: string;
  venue: string;
  event: string;
  date: string;
  status: "confirmed" | "pending" | "completed";
  total: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  token?: string;
}

// ============ Local Storage Helpers ============
function getStore<T>(key: string, defaults: T[]): T[] {
  const stored = localStorage.getItem(key);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(key, JSON.stringify(defaults));
  return defaults;
}

function setStore<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ============ Seed Data ============
import { mockEvents, mockVenues, mockAttendees, mockVendors, mockBookings } from "@/data/mockData";

// ============ Auth Service ============
export const authService = {
  login(email: string, _password: string): User {
    const isAdmin = email.toLowerCase().includes("admin");
    const user: User = {
      id: crypto.randomUUID(),
      name: isAdmin ? "Admin User" : "John Doe",
      email,
      role: isAdmin ? "admin" : "customer",
      token: `mock-jwt-${Date.now()}`,
    };
    localStorage.setItem("eventzen_user", JSON.stringify(user));
    return user;
  },

  register(name: string, email: string, _password: string): User {
    const user: User = {
      id: crypto.randomUUID(),
      name,
      email,
      role: "customer",
      token: `mock-jwt-${Date.now()}`,
    };
    localStorage.setItem("eventzen_user", JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem("eventzen_user");
  },

  getCurrentUser(): User | null {
    const stored = localStorage.getItem("eventzen_user");
    return stored ? JSON.parse(stored) : null;
  },
};

// ============ CRUD Services ============
function createCrudService<T extends { id: string }>(storageKey: string, defaults: T[]) {
  return {
    getAll(): T[] {
      return getStore<T>(storageKey, defaults);
    },
    getById(id: string): T | undefined {
      return this.getAll().find(item => item.id === id);
    },
    create(item: Omit<T, "id">): T {
      const items = this.getAll();
      const newItem = { ...item, id: crypto.randomUUID() } as T;
      items.push(newItem);
      setStore(storageKey, items);
      return newItem;
    },
    update(id: string, updates: Partial<T>): T {
      const items = this.getAll();
      const index = items.findIndex(i => i.id === id);
      if (index === -1) throw new Error("Not found");
      items[index] = { ...items[index], ...updates };
      setStore(storageKey, items);
      return items[index];
    },
    delete(id: string): void {
      const items = this.getAll().filter(i => i.id !== id);
      setStore(storageKey, items);
    },
  };
}

export const eventService = createCrudService<Event>("eventzen_events", mockEvents);
export const venueService = createCrudService<Venue>("eventzen_venues", mockVenues);
export const attendeeService = createCrudService<Attendee>("eventzen_attendees", mockAttendees);
export const vendorService = createCrudService<Vendor>("eventzen_vendors", mockVendors);
export const bookingService = createCrudService<Booking>("eventzen_bookings", mockBookings);
