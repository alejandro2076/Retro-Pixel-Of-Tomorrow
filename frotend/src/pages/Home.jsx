import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { featuredGames, specialOffers, soundtracks } from '../mockData';
import { useCart } from '../Context/Cart
import GameModal from '../components/GameModal';
import SoundtrackCarousel from '../components/SoundtrackCarousel';
import { motion } from 'framer-motion';

const Home = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [newsletter, setNewsletter] = useState('');
  const { addToCart } = useCart();

  const handleAddToCart = (game) => {
    addToCart(game);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletter) {
      alert('¡Gracias por suscribirte a nuestro newsletter!');
      setNewsletter('');
    }
  };

  const Logo = '/img/Retro_Pixel_of_Tomorrow.svg';

  return (
    <div className="home" style={{ position: 'relative', minHeight: '100vh', background: 'linear-gradient(135deg, #18181b 0%, #23272f 60%, #6c2bd7 100%)' }}>
      <div className="floating-pixels">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="pixel"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Hero Section Mejorado */}
      <section className="hero relative h-screen bg-gradient-to-b from-black via-gray-900 to-black text-center flex flex-col justify-center items-center overflow-hidden">

        {/* Logo vectorizado animado */}
        <motion.img
          src={Logo}
          alt="Retro Pixel Logo"
          className="mx-auto w-72 drop-shadow-[0_0_15px_#FFD700] mb-8"
          loading="lazy"
          width="288"
          height="288"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Fantasma CSS animado */}
        <div className="ghost absolute left-12 top-24"></div>

        <div className="hero-container">
          <div className="hero-content">
            <motion.h1 
              className="hero-title pixel-text text-4xl md:text-7xl font-extrabold text-yellow-400 mb-4 break-words"
              style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              RETRO PIXEL OF TOMORROW
            </motion.h1>
            <p className="hero-subtitle text-lg text-gray-300 mb-8 max-w-2xl">
              Donde el pasado y el futuro se encuentran en cada juego
            </p>
            <Link to="/games" className="btn btn-primary bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-[0_0_10px_#FFD700] focus:outline focus:outline-2 focus:outline-pink-500" style={{ boxShadow: '0 0 10px #FFD700', border: '2px solid #FFD700' }}>
              Explorar Catálogo
            </Link>
          </div>
        </div>

        {/* Space Invaders fila animada */}
        <div className="invader-row absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6 md:gap-10">
          <div className="invader"></div>
          <div className="invader"></div>
          <div className="invader"></div>
          <div className="invader"></div>
        </div>

        {/* Scanline CRT overlay */}
        <div className="absolute inset-0 pointer-events-none scanlines"></div>
      </section>

      {/* Categories Section */}
      <section className="categories py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="section-title text-4xl font-bold text-center text-yellow-400 pixel-font mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nuestras Categorías
          </motion.h2>
          <div className="category-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link to="/games?category=retro" className="category-card bg-gray-800 p-6 rounded-xl border-4 border-pink-500 hover:shadow-[0_0_25px_#FF00FF] transition-all duration-300 block text-center">
                <div className="category-icon text-4xl mb-4">🕹️</div>
                <h3 className="text-xl font-bold text-white mb-2">Retro Gaming</h3>
                <p className="text-gray-300">Clásicos atemporales y ROMs descargables</p>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link to="/games?category=current" className="category-card bg-gray-800 p-6 rounded-xl border-4 border-cyan-500 hover:shadow-[0_0_25px_#00FFFF] transition-all duration-300 block text-center">
                <div className="category-icon text-4xl mb-4">🎮</div>
                <h3 className="text-xl font-bold text-white mb-2">Juegos Actuales</h3>
                <p className="text-gray-300">Los últimos lanzamientos y títulos populares</p>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link to="/consoles" className="category-card bg-gray-800 p-6 rounded-xl border-4 border-green-500 hover:shadow-[0_0_25px_#00FF00] transition-all duration-300 block text-center">
                <div className="category-icon text-4xl mb-4">📺</div>
                <h3 className="text-xl font-bold text-white mb-2">Consolas</h3>
                <p className="text-gray-300">Hardware retro y consolas modernas</p>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link to="/games?category=subscription" className="category-card bg-gray-800 p-6 rounded-xl border-4 border-purple-500 hover:shadow-[0_0_25px_#8A2BE2] transition-all duration-300 block text-center">
                <div className="category-icon text-4xl mb-4">🎵</div>
                <h3 className="text-xl font-bold text-white mb-2">Suscripciones</h3>
                <p className="text-gray-300">Acceso ilimitado a bibliotecas de juegos</p>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="featured-games py-16 bg-black">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="section-title text-4xl font-bold text-center text-yellow-400 pixel-font mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Juegos Destacados
          </motion.h2>
          <div className="games-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGames.map((game, index) => (
              <motion.div
                key={game.id}
                className="game-card bg-gray-800 rounded-xl overflow-hidden border-4 border-pink-500 hover:shadow-[0_0_25px_#FF00FF] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
              >
                <div className="game-image">
                  <img 
                    src={game.image} 
                    alt={game.name}
                    className="w-full h-48 object-cover" 
                    loading="lazy"
                    width="400"
                    height="192"
                  />
                </div>
                <div className="game-info p-6">
                  <h3 className="game-name text-xl font-bold text-white mb-2">{game.name}</h3>
                  <p className="game-platform text-gray-400 mb-2">{game.platform}</p>
                  <p className="game-price text-2xl font-bold text-yellow-400 mb-4">${game.price}</p>
                  <div className="game-actions flex gap-4">
                    <button
                      onClick={() => setSelectedGame(game)}
                      className="btn btn-secondary bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                    >
                      Ver Detalles
                    </button>
                    <button
                      onClick={() => handleAddToCart(game)}
                      className="btn btn-primary bg-yellow-400 text-black px-4 py-2 rounded hover:bg-pink-500 hover:text-white transition-all duration-300"
                    >
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="special-offers py-16 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="section-title text-4xl font-bold text-center text-yellow-400 pixel-font mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ofertas Especiales
          </motion.h2>
          <div className="offers-grid grid grid-cols-1 sm:grid-cols-2 gap-8">
            {specialOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                className="offer-card bg-black bg-opacity-50 p-8 rounded-xl border-4 border-yellow-400 hover:shadow-[0_0_25px_#FFD700] transition-all duration-300"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="offer-badge bg-red-500 text-white px-4 py-2 rounded-full inline-block mb-4 font-bold">
                  {offer.discount}% OFF
                </div>
                <h3 className="offer-title text-2xl font-bold text-white mb-4">{offer.title}</h3>
                <p className="offer-description text-gray-300 mb-6">{offer.description}</p>
                <div className="offer-price flex items-center gap-4 mb-6">
                  <span className="original-price text-gray-500 line-through text-xl">${offer.originalPrice}</span>
                  <span className="discounted-price text-yellow-400 text-3xl font-bold">${offer.discountedPrice}</span>
                </div>
                <img 
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  width="400"
                  height="192"
                />
                <button className="btn btn-primary bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-pink-500 hover:text-white transition-all duration-300 w-full">
                  Aprovechar Oferta
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Soundtrack Carousel */}
      <SoundtrackCarousel soundtracks={soundtracks} />

      {/* Newsletter Section */}
      <section className="newsletter py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="section-title text-4xl font-bold text-yellow-400 pixel-font mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Mantente al Día
          </motion.h2>
          <p className="newsletter-subtitle text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y recibe las últimas noticias sobre lanzamientos, ofertas especiales y contenido exclusivo.
          </p>
          <motion.form
            onSubmit={handleNewsletterSubmit}
            className="newsletter-form flex flex-col md:flex-row gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-label="Formulario de suscripción al newsletter"
          >
            <input
              type="email"
              placeholder="Tu email"
              value={newsletter}
              onChange={(e) => setNewsletter(e.target.value)}
              className="newsletter-input flex-1 px-4 py-3 rounded-lg bg-black border-2 border-pink-500 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 transition-all duration-200 min-w-0"
              required
              aria-label="Email para suscripción"
              autoComplete="email"
            />
            <button
              type="submit"
              className="newsletter-btn bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-[0_0_10px_#FFD700] w-full md:w-auto"
            >
              Suscribirse
            </button>
          </motion.form>
        </div>
      </section>

      {/* Game Modal */}
      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default Home;