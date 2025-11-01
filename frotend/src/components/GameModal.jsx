import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../Context/CartContext.jsx';
import RetroBackground from './RetroBackground';

const GameModal = ({ game, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {

      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {

      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    addToCart(game);

    const button = document.querySelector('.add-to-cart-btn');
    if (button) {
      button.classList.add('added-animation');
      setTimeout(() => {
        button.classList.remove('added-animation');
      }, 1000);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }
    return stars.join('');
  };

  if (!game) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          <RetroBackground />
          <motion.div
            className="modal-backdrop fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
          >
            <motion.div
              ref={modalRef}
              className="game-modal bg-gray-900 rounded-2xl shadow-[0_0_50px_rgba(255,0,255,0.5)] border-4 border-pink-500 max-w-4xl w-full max-h-[90vh] overflow-hidden relative p-2 sm:p-6"
              initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 90 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.6 
              }}
              tabIndex={-1}
            >
              <motion.button
                onClick={onClose}
                className="close-btn absolute top-4 right-4 w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-[0_0_15px_rgba(255,0,0,0.5)] z-10 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Cerrar modal"
              >
                ✕
              </motion.button>

              <div className="modal-content overflow-y-auto max-h-[90vh] custom-scrollbar">

                <div className="modal-header relative">
                  <div className="game-image-container relative overflow-hidden">
                    <motion.img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-48 sm:h-80 object-cover"
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      loading="lazy"
                      width="640"
                      height="320"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

                    <motion.div
                      className="console-badge absolute top-4 left-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {game.console}
                    </motion.div>

                    <motion.div
                      className="price-badge absolute top-4 right-16 bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-[0_0_15px_rgba(0,255,0,0.5)]"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {formatPrice(game.price)}
                    </motion.div>
                  </div>

                  <motion.div
                    className="title-overlay absolute bottom-0 left-0 right-0 p-6"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 pixel-font drop-shadow-[0_0_15px_#FFD700] mb-2">
                      {game.title}
                    </h2>
                    <div className="game-meta flex items-center gap-4 text-gray-300">
                      <span className="rating text-xl">{getRatingStars(game.rating)}</span>
                      <span className="year bg-pink-500 px-3 py-1 rounded-full text-sm font-bold">
                        {game.year}
                      </span>
                      <span className="genre text-sm bg-gray-700 px-3 py-1 rounded-full">
                        {game.genre}
                      </span>
                    </div>
                  </motion.div>
                </div>

                <div className="modal-body p-6 space-y-6">

                  <motion.section
                    className="description-section"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-pink-400 mb-4 pixel-font">
                      📖 Descripción
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {game.description || `${game.title} es un clásico videojuego que marcó una época en la historia del gaming. Con gráficos revolucionarios para su tiempo y una jugabilidad adictiva, este título se convirtió en un referente del género ${game.genre}. Una experiencia nostálgica que no puedes perderte.`}
                    </p>
                  </motion.section>

                  <motion.section
                    className="specs-section"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-pink-400 mb-4 pixel-font">
                      ⚙️ Especificaciones
                    </h3>
                    <div className="specs-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="spec-item bg-gray-800 p-4 rounded-lg border-2 border-gray-700 hover:border-yellow-400 transition-colors">
                        <span className="spec-label text-yellow-400 font-bold">Consola:</span>
                        <span className="spec-value text-white ml-2">{game.console}</span>
                      </div>
                      <div className="spec-item bg-gray-800 p-4 rounded-lg border-2 border-gray-700 hover:border-yellow-400 transition-colors">
                        <span className="spec-label text-yellow-400 font-bold">Año:</span>
                        <span className="spec-value text-white ml-2">{game.year}</span>
                      </div>
                      <div className="spec-item bg-gray-800 p-4 rounded-lg border-2 border-gray-700 hover:border-yellow-400 transition-colors">
                        <span className="spec-label text-yellow-400 font-bold">Género:</span>
                        <span className="spec-value text-white ml-2">{game.genre}</span>
                      </div>
                      <div className="spec-item bg-gray-800 p-4 rounded-lg border-2 border-gray-700 hover:border-yellow-400 transition-colors">
                        <span className="spec-label text-yellow-400 font-bold">Rating:</span>
                        <span className="spec-value text-white ml-2">{game.rating}/5 ⭐</span>
                      </div>
                    </div>
                  </motion.section>

                  {game.screenshots && (
                    <motion.section
                      className="gallery-section"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold text-pink-400 mb-4 pixel-font">
                        🖼️ Capturas
                      </h3>
                      <div className="screenshots-grid grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {game.screenshots.map((screenshot, index) => (
                          <motion.img
                            key={index}
                            src={screenshot}
                            alt={`Captura de pantalla ${index + 1} de ${game.title}`}
                            className="w-full h-16 sm:h-32 object-cover rounded-lg border-2 border-gray-700 hover:border-pink-400 transition-colors cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            loading="lazy"
                            width="160"
                            height="64"
                          />
                        ))}
                      </div>
                    </motion.section>
                  )}

                  <motion.section
                    className="additional-info"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <div className="info-cards grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="info-card bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-lg text-center">
                        <div className="text-3xl mb-2">🎮</div>
                        <div className="text-white font-bold">Jugabilidad</div>
                        <div className="text-gray-200 text-sm">Clásica</div>
                      </div>
                      <div className="info-card bg-gradient-to-br from-blue-600 to-cyan-600 p-4 rounded-lg text-center">
                        <div className="text-3xl mb-2">🎵</div>
                        <div className="text-white font-bold">Soundtrack</div>
                        <div className="text-gray-200 text-sm">Icónico</div>
                      </div>
                      <div className="info-card bg-gradient-to-br from-green-600 to-emerald-600 p-4 rounded-lg text-center">
                        <div className="text-3xl mb-2">🏆</div>
                        <div className="text-white font-bold">Estado</div>
                        <div className="text-gray-200 text-sm">Disponible</div>
                      </div>
                    </div>
                  </motion.section>
                </div>

                <motion.div
                  className="modal-footer bg-gray-800 p-6 border-t-4 border-pink-500"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="footer-content flex flex-col md:flex-row items-center justify-between gap-4">


                    <div className="price-section text-center md:text-left">
                      <div className="price-label text-gray-400 text-sm">Precio:</div>
                      <div className="price-value text-4xl font-bold text-yellow-400 pixel-font drop-shadow-[0_0_10px_#FFD700]">
                        {formatPrice(game.price)}
                      </div>
                    </div>

                    <div className="action-buttons flex gap-4">
                      <motion.button
                        onClick={handleAddToCart}
                        className="add-to-cart-btn bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-[0_0_20px_rgba(0,255,0,0.5)] transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Añadir ${game.title} al carrito`}
                      >
                        🛒 Añadir al Carrito
                      </motion.button>

                      <motion.button
                        onClick={onClose}
                        className="close-modal-btn bg-gray-600 hover:bg-gray-700 text-white px-6 py-4 rounded-lg font-bold transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cerrar
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="modal-effects absolute inset-0 pointer-events-none overflow-hidden">
                <div className="floating-particles">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="particle absolute w-2 h-2 bg-pink-400 rounded-full opacity-30"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GameModal;