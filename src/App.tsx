import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminVenues from "./pages/admin/AdminVenues";
import AdminAttendees from "./pages/admin/AdminAttendees";
import AdminVendors from "./pages/admin/AdminVendors";
import CustomerLayout from "./components/CustomerLayout";
import BrowseVenues from "./pages/customer/BrowseVenues";
import MyBookings from "./pages/customer/MyBookings";
import Profile from "./pages/customer/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import BudgetTracker from "./components/BudgetTracker";
import ProfileCompletionRoute from "./components/ProfileCompletionRoute";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Portal */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="venues" element={<AdminVenues />} />
            <Route path="attendees" element={<AdminAttendees />} />
            <Route path="vendors" element={<AdminVendors />} />
            <Route path="budget" element={<BudgetTracker />} />
          </Route>

          {/* Customer Portal */}
          <Route element={
            <ProtectedRoute requiredRole="customer">
              <CustomerLayout />
            </ProtectedRoute>
          }>
            <Route path="/profile" element={<Profile />} />
            <Route path="/venues" element={
              <ProfileCompletionRoute>
                <BrowseVenues />
              </ProfileCompletionRoute>
            } />
            <Route path="/bookings" element={
              <ProfileCompletionRoute>
                <MyBookings />
              </ProfileCompletionRoute>
            } />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
