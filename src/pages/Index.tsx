import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Package, ArrowRight, Sparkles, Shield, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Calendar, title: "Event Scheduling", desc: "Plan and manage events with intuitive scheduling tools." },
  { icon: MapPin, title: "Venue Management", desc: "Browse, book, and manage venues seamlessly." },
  { icon: Users, title: "Attendee Tracking", desc: "Track registrations, guest lists, and invitations." },
  { icon: Package, title: "Vendor Coordination", desc: "Manage vendors, contracts, and deliverables." },
  { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security for your event data." },
  { icon: BarChart3, title: "Analytics & Reports", desc: "Gain insights with detailed post-event analysis." },
];

const stats = [
  { value: "500+", label: "Events Managed" },
  { value: "10K+", label: "Attendees Served" },
  { value: "200+", label: "Venues Listed" },
  { value: "98%", label: "Satisfaction Rate" },
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
            <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
          <div className="md:hidden flex gap-2">
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
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-card elevated-card">
                <div className="font-heading text-3xl font-bold text-gradient mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
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
