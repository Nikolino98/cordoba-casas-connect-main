
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Home, Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-cordoba-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="w-6 h-6" />
            <span className="text-xl font-bold">Córdoba Casas</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-cordoba-secondary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-200 transition-colors">Inicio</Link>
            <Link to="/propiedades" className="hover:text-gray-200 transition-colors">Propiedades</Link>
            {/* <Link to="/about" className="hover:text-gray-200 transition-colors">Nosotros</Link> */}
            <Link to="/contacto" className="hover:text-gray-200 transition-colors">Contacto</Link>
            <Button className="bg-white text-cordoba-primary hover:bg-gray-100" asChild>
              <Link to="/admin">
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Link>
            </Button>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3 pb-3">
            <Link to="/" className="block py-2 hover:bg-cordoba-secondary px-3 rounded">Inicio</Link>
            <Link to="/propiedades" className="block py-2 hover:bg-cordoba-secondary px-3 rounded">Propiedades</Link>
            <Link to="/about" className="block py-2 hover:bg-cordoba-secondary px-3 rounded">Nosotros</Link>
            <Link to="/contacto" className="block py-2 hover:bg-cordoba-secondary px-3 rounded">Contacto</Link>
            <Button className="w-full bg-white text-cordoba-primary hover:bg-gray-100" asChild>
              <Link to="/admin">
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
