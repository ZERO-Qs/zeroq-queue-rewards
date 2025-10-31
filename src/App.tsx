import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Organization from "./pages/Organization";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrgAdminSetup from "./pages/OrgAdminSetup";
import Profile from "./pages/Profile";

import { AdminLayout } from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import LiveQueues from "./pages/admin/LiveQueues";
import Analytics from "./pages/admin/Analytics";
import AdminProfile from "./pages/admin/AdminProfile";
import { OrgAdminLayout } from "./components/orgAdmin/OrgAdminLayout";
import OrgAdminDashboard from "./pages/orgAdmin/Dashboard";
import OrgAdminQueues from "./pages/orgAdmin/Queues";
import OrgAdminCounters from "./pages/orgAdmin/Counters";
import OrgAdminUsers from "./pages/orgAdmin/Users";
import OrgAdminSettings from "./pages/orgAdmin/Settings";
import OrgAdminProfile from "./pages/orgAdmin/OrgAdminProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/organization/:id" element={<Organization />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/org-admin-setup" element={<OrgAdminSetup />} />


            
            {/* Global Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="queues" element={<LiveQueues />} />
              <Route path="organizations" element={<Dashboard />} />
              <Route path="users" element={<Dashboard />} />
              <Route path="tokens" element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Dashboard />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>

            {/* Organization Admin Routes */}
            <Route path="/org-admin" element={<OrgAdminLayout />}>
              <Route index element={<OrgAdminDashboard />} />
              <Route path="queues" element={<OrgAdminQueues />} />
              <Route path="counters" element={<OrgAdminCounters />} />
              <Route path="users" element={<OrgAdminUsers />} />
              <Route path="settings" element={<OrgAdminSettings />} />
              <Route path="profile" element={<OrgAdminProfile />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
