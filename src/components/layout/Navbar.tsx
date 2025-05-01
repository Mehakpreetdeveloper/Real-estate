
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Building, User, Menu, X, Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("hasLoggedIn");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Building className="h-6 w-6 text-navy" />
            <span className="text-lg font-bold text-navy">Real Estate Fund</span>
          </Link>
        </div>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            {isMenuOpen && (
              <div className="absolute top-16 left-0 w-full bg-background border-b border-border/40 p-4 md:hidden">
                <div className="flex flex-col space-y-3">
                  <Link
                    to="/dashboard"
                    className="px-3 py-2 text-sm rounded-md hover:bg-muted"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/map"
                    className="px-3 py-2 text-sm rounded-md hover:bg-muted"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Map
                  </Link>
                  <Link
                    to="/admin"
                    className="px-3 py-2 text-sm rounded-md hover:bg-muted"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                  <Button
                    variant="outline"
                    className="justify-start px-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="hidden md:flex md:items-center md:gap-4">
            <Link
              to="/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              to="/map"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Map
            </Link>
            <Link
              to="/admin"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Admin
            </Link>
          </div>
        )}

        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
