import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../Context/CartContext.jsx';
import { useAuth } from '../Context/AuthContext.jsx';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const cartItemsCount = cartItems.length;

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((open) => !open);
  }, []);

  const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

  return (
    <header className="header" style={{ width: '100vw', minWidth: '100%', background: '#23272f', color: '#f5f5f5', boxSizing: 'border-box' }}>
      <div className="container header-container" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', padding: '0 15px' }}>
        <Link to="/" className="logo">
          RETRO PIXEL OF TOMORROW
        </Link>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`} aria-label="Navegación principal">
          <ul className="nav-menu" style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: 0, padding: 0 }}>
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
                tabIndex={0}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/games" 
                className={`nav-link ${isActive('/games') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
                tabIndex={0}
                aria-current={isActive('/games') ? 'page' : undefined}
              >
                Juegos
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/consoles" 
                className={`nav-link ${isActive('/consoles') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
                tabIndex={0}
                aria-current={isActive('/consoles') ? 'page' : undefined}
              >
                Consolas
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/contact" 
                className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
                tabIndex={0}
                aria-current={isActive('/contact') ? 'page' : undefined}
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          
          {user ? (
            <div className="user-menu" role="menu" aria-label="Menú de usuario">
              <span className="user-name">Hola, {user.username}</span>
              <button onClick={logout} className="logout-btn" aria-label="Cerrar sesión">Salir</button>
            </div>
          ) : (
            <Link to="/login" className="login-btn">Iniciar Sesión</Link>
          )}
          
          <div className="cart-icon" role="button" tabIndex={0} aria-label="Abrir carrito" onClick={() => document.getElementById('cart-modal').classList.add('open')}>
            🛒
            {cartItemsCount > 0 && (
              <span className="cart-count" aria-label={`Carrito con ${cartItemsCount} productos`}>{cartItemsCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;