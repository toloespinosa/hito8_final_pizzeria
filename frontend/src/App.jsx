import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Pizza from './pages/Pizza';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { PrivateRoute, PublicRoute } from './components/Routes'; // Importa tus rutas protegidas
import { UserProvider } from './context/UserContext'; // Envolver con el UserProvider
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <UserProvider> {/* Envolvemos la app con el UserProvider */}
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          
          {/* Rutas públicas: Solo accesibles si no hay token */}
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          
          {/* Ruta para cada pizza */}
          <Route path='/pizza/:id' element={<Pizza />} />
          
          {/* Ruta para el carrito */}
          <Route path='/cart' element={<Cart />} />
          
          {/* Ruta protegida: Solo accesible si hay token */}
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          
          {/* Manejo de rutas inexistentes */}
          <Route path='/404' element={<NotFound />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <Footer />
      </CartProvider>
    </UserProvider>
  );
}

export default App;
