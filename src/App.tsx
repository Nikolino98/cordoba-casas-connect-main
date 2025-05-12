import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

import ScrollToTop from "@/components/ScrollToTop";
import Index from "@/pages/Index";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
// import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import Admin from "@/pages/Admin";
import AdminAuth from "@/components/AdminAuth";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <div className="grid-background min-h-screen">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/propiedades" element={<Properties />} />
            <Route path="/propiedad/:id" element={<PropertyDetail />} />
            {/* <Route path="/sobre-nosotros" element={<About />} /> */}
            <Route path="/contacto" element={<Contact />} />
            <Route
              path="/admin"
              element={
                <AdminAuth>
                  <Admin />
                </AdminAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
