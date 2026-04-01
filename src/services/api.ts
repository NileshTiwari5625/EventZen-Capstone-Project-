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
  phone?: string;
  profileCompleted?: boolean;
  token?: string;
}

interface StoredAuthUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  profileCompleted: boolean;
  role: "admin" | "customer";
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
import { mockEvents, mockVenues, mockAttendees, mockVendors } from "@/data/mockData";


function clearLegacySampleBookings() {
  const raw = localStorage.getItem("eventzen_bookings");
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;

    const isLegacySeed = parsed.length > 0
      && parsed.every((booking: unknown) => {
        if (!booking || typeof booking !== "object") return false;
        const record = booking as Record<string, unknown>;
        return typeof record.id === "string"
          && ["1", "2", "3"].includes(record.id)
          && typeof record.event === "string";
      });

    if (isLegacySeed) {
      localStorage.setItem("eventzen_bookings", JSON.stringify([]));
    }
  } catch {
    localStorage.removeItem("eventzen_bookings");
  }
}

clearLegacySampleBookings();

function resetLegacySampleVenues() {
  const raw = localStorage.getItem("eventzen_venues");
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;

    const legacyNames = new Set([
      "Grand Convention Center",
      "Riverside Park Amphitheater",
      "The Ritz Ballroom",
      "Innovation Hub",
      "Crystal Palace",
      "Skyline Rooftop",
      "The Taj Mahal Palace",
      "ITC Gardenia",
      "The Leela Ambience Gurugram",
      "Taj Krishna",
      "Hyatt Regency",
      "JW Marriott",
      "The Westin Pune Koregaon Park",
      "ITC Sonar",
    ]);

    const hasLegacyVenues = parsed.length > 0 && parsed.every((venue: unknown) => {
      if (!venue || typeof venue !== "object") return false;
      const record = venue as Record<string, unknown>;
      return typeof record.name === "string" && legacyNames.has(record.name);
    });

    if (hasLegacyVenues) {
      localStorage.setItem("eventzen_venues", JSON.stringify(mockVenues));
    }
  } catch {
    localStorage.setItem("eventzen_venues", JSON.stringify(mockVenues));
  }
}

resetLegacySampleVenues();

// ============ Auth Service ============
export const authService = {
  login(email: string, password: string): User {
    const users = getStore<StoredAuthUser>("eventzen_auth_users", []);
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = users.find(user => user.email === normalizedEmail);

    if (!existingUser || existingUser.password !== password) {
      throw new Error("Invalid email or password.");
    }

    const user: User = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      phone: existingUser.phone,
      profileCompleted: existingUser.profileCompleted ?? false,
      token: `mock-jwt-${Date.now()}`,
    };

    localStorage.setItem("eventzen_user", JSON.stringify(user));
    return user;
  },

  register(name: string, email: string, password: string, phone?: string): User {
    const users = getStore<StoredAuthUser>("eventzen_auth_users", []);
    const normalizedEmail = email.trim().toLowerCase();
    const emailAlreadyExists = users.some(user => user.email === normalizedEmail);

    if (emailAlreadyExists) {
      throw new Error("An account with this email already exists.");
    }

    const normalizedPhone = phone?.trim() ?? "";

    const newStoredUser: StoredAuthUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      phone: normalizedPhone || undefined,
      profileCompleted: Boolean(normalizedPhone),
      role: "customer",
    };

    setStore("eventzen_auth_users", [...users, newStoredUser]);

    const user: User = {
      id: newStoredUser.id,
      name: newStoredUser.name,
      email: newStoredUser.email,
      role: newStoredUser.role,
      phone: newStoredUser.phone,
      profileCompleted: newStoredUser.profileCompleted,
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

  updateProfile(updates: { name: string; email: string; phone: string }): User {
    const currentUser = this.getCurrentUser();
    if (!currentUser) throw new Error("You must be signed in to update profile.");

    const users = getStore<StoredAuthUser>("eventzen_auth_users", []);
    const normalizedEmail = updates.email.trim().toLowerCase();
    const emailInUseByAnotherUser = users.some(user => user.email === normalizedEmail && user.id !== currentUser.id);

    if (emailInUseByAnotherUser) {
      throw new Error("That email is already used by another account.");
    }

    const nextUsers = users.map(user => user.id === currentUser.id
      ? {
          ...user,
          name: updates.name.trim(),
          email: normalizedEmail,
          phone: updates.phone.trim(),
          profileCompleted: true,
        }
      : user);

    setStore("eventzen_auth_users", nextUsers);

    const updatedUser: User = {
      ...currentUser,
      name: updates.name.trim(),
      email: normalizedEmail,
      phone: updates.phone.trim(),
      profileCompleted: true,
    };

    localStorage.setItem("eventzen_user", JSON.stringify(updatedUser));
    return updatedUser;
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
export const bookingService = createCrudService<Booking>("eventzen_bookings", []);
