import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiSun, 
  FiMoon, 
  FiUser, 
  FiChevronDown,
  FiGlobe,
  FiMenu,
  FiX,
  FiSettings
} from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const { getCurrentLanguage, setLanguage, languages } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLang = getCurrentLanguage();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-nav-background/95 backdrop-blur supports-[backdrop-filter]:bg-nav-background/60"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">GB</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Gyaani Bot
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <FiGlobe className="h-4 w-4" />
                  <span>{currentLang.nativeName}</span>
                  <FiChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`cursor-pointer ${
                      lang.code === currentLang.code ? 'bg-primary/10 text-primary' : ''
                    }`}
                  >
                    <span className="font-medium">{lang.nativeName}</span>
                    <span className="ml-2 text-muted-foreground">({lang.name})</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-9 w-9 p-0"
            >
              {theme === 'dark' ? 
                <FiSun className="h-4 w-4" /> : 
                <FiMoon className="h-4 w-4" />
              }
            </Button>

            {/* Settings & Login Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <FiUser className="h-4 w-4" />
                  <span>Account</span>
                  <FiChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center w-full">
                    <FiSettings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login" className="flex items-center w-full">
                    <FiUser className="h-4 w-4 mr-2" />
                    {location.pathname === '/login' ? 'Login' : 'Sign In'}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? 
              <FiX className="h-5 w-5" /> : 
              <FiMenu className="h-5 w-5" />
            }
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-nav-border bg-nav-background/95 backdrop-blur"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Language Switcher Mobile */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Language</p>
                <div className="grid grid-cols-1 gap-2">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={lang.code === currentLang.code ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setLanguage(lang.code)}
                      className="justify-start"
                    >
                      <FiGlobe className="h-4 w-4 mr-2" />
                      <span>{lang.nativeName}</span>
                      <span className="ml-auto text-muted-foreground">({lang.name})</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Theme Toggle Mobile */}
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className="w-full justify-start"
              >
                {theme === 'dark' ? 
                  <FiSun className="h-4 w-4 mr-2" /> : 
                  <FiMoon className="h-4 w-4 mr-2" />
                }
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>

              {/* Settings Button Mobile */}
              <Link to="/settings" className="block">
                <Button 
                  variant={location.pathname === '/settings' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiSettings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>

              {/* Login Button Mobile */}
              <Link to="/login" className="block">
                <Button 
                  variant={location.pathname === '/login' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiUser className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;