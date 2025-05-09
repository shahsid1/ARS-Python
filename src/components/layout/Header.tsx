
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Plane, Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Support", href: "/support" },
    { name: "About", href: "/about" }
  ];

  const authLinks = [
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register", isPrimary: true }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-airline-dusty-blue header-shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Plane className="h-6 w-6 text-white mr-2" />
              <span className="text-2xl font-bold text-white">NAMMA</span>
              <span className="text-xl font-medium text-airline-light-beige ml-1">AIRLINES</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-airline-light-beige ${
                    isActive(item.href) 
                      ? "text-airline-light-beige font-bold" 
                      : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* Theme toggle switch */}
            <div className="flex items-center space-x-2 mr-4">
              <Sun className="h-[1.2rem] w-[1.2rem] text-white" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-airline-deep-navy"
              />
              <Moon className="h-[1.2rem] w-[1.2rem] text-white" />
            </div>

            {authLinks.map((link) => (
              <Button
                key={link.name}
                variant={link.isPrimary ? "default" : "outline"}
                asChild
                className={link.isPrimary ? "bg-airline-deep-navy hover:bg-opacity-80 text-white" : "border-white text-white hover:bg-airline-dusty-blue hover:bg-opacity-80"}
              >
                <Link to={link.href}>{link.name}</Link>
              </Button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {/* Theme toggle switch for mobile */}
            <div className="flex items-center space-x-2 mr-4">
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-airline-deep-navy"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:bg-airline-dusty-blue hover:bg-opacity-80"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 pb-6 border-t border-airline-soft-blue-gray animate-fade-in">
            <div className="flex flex-col space-y-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`py-2 text-base font-medium ${
                    isActive(item.href)
                      ? "text-airline-light-beige font-bold"
                      : "text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4">
                {authLinks.map((link) => (
                  <Button
                    key={link.name}
                    variant={link.isPrimary ? "default" : "outline"}
                    onClick={() => setMobileMenuOpen(false)}
                    asChild
                    className={`w-full ${link.isPrimary ? "bg-airline-deep-navy hover:bg-opacity-80 text-white" : "border-white text-white hover:bg-airline-dusty-blue hover:bg-opacity-80"}`}
                  >
                    <Link to={link.href}>{link.name}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
