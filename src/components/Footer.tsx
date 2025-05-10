
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cordoba-dark text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Home className="w-6 h-6" />
              <span className="text-xl font-bold">Córdoba Casas</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Tu aliado inmobiliario en Córdoba. Encontramos el hogar perfecto para vos.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-white">
                <Facebook />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-white">
                <Instagram />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-white">
                <Twitter />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Inicio</Link>
              </li>
              <li>
                <Link to="/propiedades" className="text-gray-300 hover:text-white transition-colors">Propiedades</Link>
              </li>
              <li>
                {/* <Link to="/about" className="text-gray-300 hover:text-white transition-colors">Nosotros</Link> */}
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-white transition-colors">Contacto</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Home className="w-5 h-5 mr-2 mt-0.5" />
                <span>Av. Colón 1234, Córdoba, Argentina</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>+54 351 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>info@cordobacasas.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Córdoba Casas. Todos los derechos reservados. Nicolas Perez.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
