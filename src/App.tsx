
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";

import AppLayout from "./components/layout/AppLayout";
import AdminLayout from "./components/admin/AdminLayout";
import CustomerLayout from "./components/customer/CustomerLayout";

import Index from "./pages/Index";
import About from "./pages/About";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Wallet from "./components/customer/Wallet";

// Admin pages
import AdminDashboard from "./pages/Admin/Dashboard";
import ManageFlights from "./pages/Admin/ManageFlights";
import ManageAirports from "./pages/Admin/ManageAirports";
import ManageAirplanes from "./pages/Admin/ManageAirplanes";
import ManageCustomers from "./pages/Admin/ManageCustomers";
import ManageBookings from "./pages/Admin/ManageBookings";
import CustomerSupport from "./pages/Admin/CustomerSupport";

// Customer pages
import CustomerDashboard from "./pages/Customer/Dashboard";
import CustomerBookings from "./pages/Customer/Bookings";
import TransactionHistory from "./pages/Customer/Transactions";
import UserProfile from "./pages/Customer/Profile";
import CustomerSearch from "./pages/Customer/Search";
import SearchResults from "./pages/Customer/SearchResults";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Index />} />
              <Route path="about" element={<About />} />
              <Route path="support" element={<Support />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="flights" element={<ManageFlights />} />
              <Route path="airports" element={<ManageAirports />} />
              <Route path="airplanes" element={<ManageAirplanes />} />
              <Route path="customers" element={<ManageCustomers />} />
              <Route path="bookings" element={<ManageBookings />} />
              <Route path="support" element={<CustomerSupport />} />
            </Route>

            {/* Customer Routes */}
            <Route path="/customer" element={<CustomerLayout />}>
              <Route path="dashboard" element={<CustomerDashboard />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="bookings" element={<CustomerBookings />} />
              <Route path="transactions" element={<TransactionHistory />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="search" element={<CustomerSearch />} />
              <Route path="search-results" element={<SearchResults />} />
            </Route>

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
