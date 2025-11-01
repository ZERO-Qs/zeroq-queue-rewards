import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, HelpCircle, User, ChevronDown, LogOut, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileModal } from "./ProfileModal";
import { useState } from "react";
import { OrgAdminProfileModal } from "./orgAdmin/OrgAdminProfileModal";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout, userType, isAdmin } = useAuth();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isOrgAdminProfileModalOpen, setIsOrgAdminProfileModalOpen] = useState(false);

  const handleOpenProfileModal = () => {
    if (userType === "orgAdmin") {
      setIsOrgAdminProfileModalOpen(true);
    } else {
      setIsProfileModalOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ZeroQ</h1>
              <p className="text-xs text-muted-foreground -mt-0.5">Smarter Queues</p>
            </div>
          </Link>

          {/* Center Navigation - Conditionally render for non-admin users */}
          {!isAdmin && (
            <div className="hidden md:flex items-center gap-8">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>

              <Link 
                to="/queues" 
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <List className="w-4 h-4" />
                Queues
              </Link>



              <Link 
                to="/support" 
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                Support
              </Link>
            </div>
          )}

          {/* Right Side - Always render */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <Button variant="outline" className="gap-2" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Login</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Link to="/login" className="w-full">Login</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* This button seems redundant if using DropdownMenu for user actions */}
            {/* <Button variant="ghost" size="icon" className="rounded-full">
              <User className="w-5 h-5" />
            </Button> */}
          </div>
        </div>
      </div>
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <OrgAdminProfileModal isOpen={isOrgAdminProfileModalOpen} onClose={() => setIsOrgAdminProfileModalOpen(false)} />
    </nav>
  );
};