
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ children }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuthenticated') === 'true';
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar credenciales
    if (username === 'admin223' && password === '2232admin') {
      localStorage.setItem('adminAuthenticated', 'true');
      setIsAuthenticated(true);
      toast({
        title: "Acceso permitido",
        description: "Has iniciado sesión como administrador correctamente.",
      });
    } else {
      toast({
        title: "Error de autenticación",
        description: "Usuario o contraseña incorrectos.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    toast({
      title: "Sesión finalizada",
      description: "Has cerrado sesión como administrador.",
    });
  };

  if (isAuthenticated) {
    return (
      <div>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
          <div className="flex justify-between items-center">
            <p className="text-yellow-700">
              <span className="font-bold">Modo Administrador</span> - Tienes acceso completo al panel
            </p>
            <Button variant="outline" onClick={handleLogout}>Cerrar sesión</Button>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="mt-2 text-gray-600">Ingresa tus credenciales para acceder</p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Usuario
                </label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-cordoba-primary hover:bg-cordoba-secondary">
              Iniciar sesión
            </Button>
            
            <div className="text-center mt-4">
              <a href="/" className="text-sm text-cordoba-primary hover:underline">
                Volver al inicio
              </a>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Necesitamos importar Header y Footer aquí
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default AdminAuth;
