import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Package, ArrowRight, Sparkles, Shield, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const features = [
  { icon: Calendar, title: "Event Scheduling", desc: "Plan and manage events with intuitive scheduling tools." },
  { icon: MapPin, title: "Venue Management", desc: "Browse, book, and manage venues seamlessly." },
  { icon: Users, title: "Attendee Tracking", desc: "Track registrations, guest lists, and invitations." },
  { icon: Package, title: "Vendor Coordination", desc: "Manage vendors, contracts, and deliverables." },
  { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security for your event data." },
  { icon: BarChart3, title: "Analytics & Reports", desc: "Gain insights with detailed post-event analysis." },
];

const launchHighlights = [
  { title: "City-first venue discovery", desc: "Filter venues by city and instantly narrow options by name or location." },
  { title: "Trust signals at a glance", desc: "Compare capacity, ratings, amenities, and daily pricing before booking." },
  { title: "Guided booking workflow", desc: "Book with event name + date validation to reduce invalid requests." },
  { title: "Role-based experience", desc: "Customers and admins get focused dashboards for their daily tasks." },
];

const whatsNew = [
  "Venue cards now show stronger booking details for faster decisions",
  "City filters and quick chips help you discover hotels in seconds",
  "Booking flow highlights transparent pricing and amenity coverage",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-nav">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-heading text-xl font-bold">EventZen</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#highlights" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Highlights</a>
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
          <div className="md:hidden flex gap-2 items-center">
            <ThemeToggle />
            <Link to="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
            <Link to="/register"><Button size="sm">Sign Up</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium gradient-primary text-primary-foreground mb-6">
              Event Management Reimagined
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Plan Memorable Events with <span className="text-gradient">EventZen</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Streamline every aspect of event planning — from venue booking to attendee management — all in one powerful platform.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="gradient-primary text-primary-foreground border-0 gap-2">
                  Start Planning <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/venues">
                <Button size="lg" variant="outline">
                  Browse Venues
                </Button>
              </Link>
            </div>

            <div className="mt-12 rounded-xl bg-card/80 elevated-card p-4 text-left">
              <p className="text-sm font-semibold mb-2">Why teams choose EventZen</p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                {whatsNew.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value highlights */}
      <section id="highlights" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold mb-3">Plan smarter, book faster</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From discovery to reservation, EventZen focuses on practical venue selection and booking confidence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {launchHighlights.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="p-6 rounded-xl bg-card elevated-card text-left">
                <div className="font-heading text-lg font-semibold mb-2">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-3">Everything You Need</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Comprehensive tools to manage every aspect of your events.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="p-6 rounded-xl bg-card elevated-card hover:border-primary/30 group">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="p-10 rounded-2xl gradient-primary">
            <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-primary-foreground/80 mb-6">Join hundreds of event planners who trust EventZen.</p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="gap-2">
                Create Free Account <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-heading font-bold">EventZen</span>
          </div>
          <p className="text-sm text-muted-foreground">&copy; 2026 EventZen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
