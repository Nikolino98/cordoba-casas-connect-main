
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Home, Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-cordoba-primary shadow-md sticky top-0 z-50 w-full border-b border-primary/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Córdoba Casas
            </span>
          </Link>
        </div>

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


        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-blue-800">
            Inicio
          </Link>
          <Link to="/propiedades" className="text-sm font-medium transition-colors hover:text-blue-800">
            Propiedades
          </Link>
          <Link to="/contacto" className="text-sm font-medium transition-colors hover:text-blue-800">
            Contacto
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Link 
            to="/admin" 
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            <Settings className="w-4 h-4 mr-2"/>
            ADMIN
          </Link>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3 pb-3">
            <Link to="/" className="block py-2 hover:bg-cordoba-secondary px-3 rounded">Inicio</Link>
            <Link to="/propiedades" className="block py-2 hover:bg-cordoba-secondary px-3 rounded">Propiedades</Link>
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
