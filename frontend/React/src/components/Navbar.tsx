import { Link, useLocation } from "react-router-dom";
import { Leaf, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container flex h-16 items-center justify-between px-6 max-w-6xl mx-auto">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center shadow-primary">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            PlantCare AI
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary border-b-2 border-primary pb-0.5" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/about" ? "text-primary border-b-2 border-primary pb-0.5" : "text-muted-foreground"
            }`}
          >
            About
          </Link>

          <Link
            to="/upload"
            className="px-4 py-2 rounded-lg gradient-hero text-primary-foreground text-sm font-semibold shadow-primary hover:opacity-90 transition-all active:scale-95"
          >
            Get Started
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary hover:bg-accent transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
