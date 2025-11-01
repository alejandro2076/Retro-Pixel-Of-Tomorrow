import React, { useEffect, useCallback } from 'react';
import { useCart } from '../Context/CartContext.jsx';
import { useAuth } from '../Context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import RetroBackground from './RetroBackground';

const Cart = () => {
  const { 
    cartItems, 
    isCartOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    setIsCartOpen 
  } = useCart();
  const { isAuthenticated } = useAuth();

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, [setIsCartOpen]);

  const handleCheckout = useCallback(() => {
    if (!isAuthenticated()) {
      alert('Debes iniciar sesión para realizar una compra');
      closeCart();
      return;
    }

    if (cartItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    alert(`¡Compra realizada con éxito! Total: $${getCartTotal().toFixed(2)}`);
    clearCart();
    closeCart();
  }, [isAuthenticated, cartItems, getCartTotal, clearCart, closeCart]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const cartModal = document.getElementById('cart-modal');
      if (cartModal && !cartModal.contains(event.target) && isCartOpen) {
        const cartIcon = document.querySelector('.cart-icon');
        if (!cartIcon.contains(event.target)) {
          closeCart();
        }
      }
    };

    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isCartOpen, closeCart]);

  return (
    <div id="cart-modal" className={`cart-modal ${isCartOpen ? 'open' : ''}`}>
      <RetroBackground />
      <div className="cart-modal-content">
        <div className="cart-header">
          <h2>Tu Carrito</h2>
          <button className="close-cart" onClick={closeCart} aria-label="Cerrar carrito">×</button>
        </div>
        
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Tu carrito está vacío</p>
              <Link to="/games" onClick={closeCart} className="btn btn-primary">
                Explorar Juegos
              </Link>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item flex flex-col sm:flex-row">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="cart-item-image w-20 h-20 sm:w-16 sm:h-16 object-cover"
                  loading="lazy"
                  width="60"
                  height="60"
                  aria-label={`Imagen de ${item.name}`}
                />
                <div className="cart-item-details">
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-platform">{item.platform}</div>
                  <div className="cart-item-price">${item.price}</div>
                  <div className="cart-item-quantity">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                      aria-label={`Disminuir cantidad de ${item.name}`}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                      aria-label={`Aumentar cantidad de ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                <button 
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Eliminar ${item.name} del carrito`}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <div className="cart-total">
              Total: ${getCartTotal().toFixed(2)}
            </div>
            <div className="cart-actions" role="group" aria-label="Acciones del carrito">
              <button 
                className="btn btn-secondary"
                onClick={clearCart}
                aria-label="Vaciar carrito"
              >
                Vaciar Carrito
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleCheckout}
                aria-label={isAuthenticated() ? 'Finalizar compra' : 'Iniciar sesión para comprar'}
              >
                {isAuthenticated() ? 'Finalizar Compra' : 'Iniciar Sesión para Comprar'}
              </button>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .cart-modal {
          position: fixed;
          top: 0;
          right: -400px;
          width: 350px;
          height: 100vh;
          background-color: var(--card-bg);
          box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
          transition: right 0.3s ease;
          z-index: 1001;
          padding: 20px;
          overflow-y: auto;
          color: var(--text-color);
        }

        .cart-modal.open {
          right: 0;
        }

        .cart-modal-content {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }

        .close-cart {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: var(--text-color);
        }

        .cart-items {
          flex: 1;
          margin-bottom: 20px;
        }

        .empty-cart {
          text-align: center;
          padding: 2rem;
        }

        .empty-cart p {
          margin-bottom: 1rem;
          color: var(--text-color);
        }

        .cart-item {
          display: flex;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
          gap: 10px;
        }

        .cart-item-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
        }

        .cart-item-details {
          flex: 1;
        }

        .cart-item-title {
          font-weight: bold;
          margin-bottom: 5px;
          font-size: 0.9rem;
        }

        .cart-item-platform {
          font-size: 0.8rem;
          color: var(--primary-color);
          margin-bottom: 5px;
        }

        .cart-item-price {
          color: var(--secondary-color);
          font-weight: bold;
          margin-bottom: 5px;
        }

        .cart-item-quantity {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 5px;
        }

        .quantity-btn {
          background: var(--primary-color);
          color: white;
          border: none;
          width: 25px;
          height: 25px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quantity {
          font-weight: bold;
          min-width: 30px;
          text-align: center;
        }

        .cart-item-total {
          font-size: 0.8rem;
          font-weight: bold;
          color: var(--secondary-color);
        }

        .cart-item-remove {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          align-self: flex-start;
        }

        .cart-summary {
          margin-top: auto;
          border-top: 1px solid #eee;
          padding-top: 20px;
        }

        .cart-total {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: right;
          color: var(--secondary-color);
        }

        .cart-actions {
          display: flex;
          gap: 10px;
        }

        .cart-actions .btn {
          flex: 1;
          padding: 10px;
          text-align: center;
        }

        @media (max-width: 480px) {
          .cart-modal {
            width: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;