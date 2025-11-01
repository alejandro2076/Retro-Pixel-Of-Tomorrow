import React, { useState, useEffect } from 'react';
import { games } from '../mockData';
import { useCart } from '../Context/CartContext.jsx';
import GameModal from '../components/GameModal';
import { sanitizeInput } from '../utils/sanitize';

const Games = () => {
  const [filteredGames, setFilteredGames] = useState(games);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    platform: 'all',
    year: 'all',
    type: 'all',
    priceRange: 'all'
  });
  const { addToCart } = useCart();

  const categories = ['all', 'retro', 'action', 'adventure', 'subscription'];
  const platforms = ['all', 'PC', 'Nintendo Switch', 'PlayStation 5', 'Xbox Game Pass', 'NES', 'Game Boy', 'Arcade'];
  const years = ['all', '1980-1990', '1990-2000', '2000-2010', '2010-2020', '2020+'];
  const types = ['all', 'retail', 'rom', 'subscription'];
  const priceRanges = ['all', 'free', '0-10', '10-30', '30-60', '60+'];

  useEffect(() => {
    let filtered = games;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.platform.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(game => game.category === filters.category);
    }

    // Filter by platform
    if (filters.platform !== 'all') {
      filtered = filtered.filter(game => game.platform === filters.platform);
    }

    // Filter by year
    if (filters.year !== 'all') {
      const [startYear, endYear] = filters.year.includes('-') 
        ? filters.year.split('-').map(y => y.includes('+') ? 2024 : parseInt(y))
        : [parseInt(filters.year), parseInt(filters.year)];
      
      filtered = filtered.filter(game => {
        if (filters.year === '2020+') {
          return game.year >= 2020;
        }
        return game.year >= startYear && game.year <= endYear;
      });
    }

    // Filter by type
    if (filters.type !== 'all') {
      filtered = filtered.filter(game => game.type === filters.type);
    }

    // Filter by price range
    if (filters.priceRange !== 'all') {
      if (filters.priceRange === 'free') {
        filtered = filtered.filter(game => game.price === 0);
      } else if (filters.priceRange === '60+') {
        filtered = filtered.filter(game => game.price >= 60);
      } else {
        const [min, max] = filters.priceRange.split('-').map(p => parseFloat(p));
        filtered = filtered.filter(game => game.price >= min && game.price <= max);
      }
    }

    setFilteredGames(filtered);
  }, [searchTerm, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      platform: 'all',
      year: 'all',
      type: 'all',
      priceRange: 'all'
    });
    setSearchTerm('');
  };

  const sortGames = (sortBy) => {
    let sorted = [...filteredGames];
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'year':
        sorted.sort((a, b) => b.year - a.year);
        break;
      case 'popularity':
        sorted.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    setFilteredGames(sorted);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm(sanitizeInput(value));
  };

  return (
    <div className="games-page">
      <div className="container">
        <div className="games-header">
          <h1 className="section-title">Catálogo de Juegos</h1>
          <p className="games-subtitle">
            Descubre nuestra colección de juegos retro y actuales
          </p>
        </div>

        {/* Search and Filters */}
        <div className="search-filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar juegos..."
              value={searchTerm}
              onChange={handleInputChange}
              className="search-input"
              aria-label="Buscar juegos"
              autoComplete="off"
            />
          </div>

          <div className="filters">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="filter-select"
              aria-label="Filtrar por categoría"
            >
              <option value="all">Todas las categorías</option>
              {categories.filter(cat => cat !== 'all').map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={filters.platform}
              onChange={(e) => handleFilterChange('platform', e.target.value)}
              className="filter-select"
            >
              <option value="all">Todas las plataformas</option>
              {platforms.filter(platform => platform !== 'all').map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>

            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos los tipos</option>
              <option value="retail">Compra directa</option>
              <option value="rom">ROM disponible</option>
              <option value="subscription">Suscripción</option>
            </select>

            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos los precios</option>
              <option value="free">Gratis</option>
              <option value="0-10">$0 - $10</option>
              <option value="10-30">$10 - $30</option>
              <option value="30-60">$30 - $60</option>
              <option value="60+">$60+</option>
            </select>

            <button onClick={clearFilters} className="clear-filters">
              Limpiar Filtros
            </button>
          </div>

          <div className="sort-options">
            <label>Ordenar por:</label>
            <select onChange={(e) => sortGames(e.target.value)} className="sort-select">
              <option value="">Seleccionar...</option>
              <option value="name">Nombre A-Z</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
              <option value="year">Año (Más reciente)</option>
              <option value="popularity">Popularidad</option>
              <option value="rating">Calificación</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          Mostrando {filteredGames.length} de {games.length} juegos
        </div>

        {/* Games Grid */}
        <div className="games-grid">
          {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <div key={game.id} className="game-card">
                <div className="game-image">
                  <img src={game.image} alt={game.name} loading="lazy" />
                  {game.type === 'rom' && (
                    <div className="rom-badge">ROM</div>
                  )}
                  {game.type === 'subscription' && (
                    <div className="subscription-badge">SUSCRIPCIÓN</div>
                  )}
                </div>
                
                <div className="game-info">
                  <h3 className="game-title">{game.name}</h3>
                  <div className="game-platform">{game.platform}</div>
                  <div className="game-year">Año: {game.year}</div>
                  <div className="game-rating">⭐ {game.rating}/10</div>
                  <div className="game-price">
                    {game.price === 0 ? 'GRATIS' : `$${game.price}`}
                  </div>
                  <div className="game-stock">Stock: {game.stock}</div>
                  
                  <div className="game-actions">
                    <button
                      className="btn-details"
                      onClick={() => setSelectedGame(game)}
                    >
                      Ver Detalles
                    </button>
                    <button
                      className="add-to-cart"
                      onClick={() => addToCart(game)}
                      disabled={game.stock === 0}
                    >
                      {game.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>No se encontraron juegos</h3>
              <p>Intenta ajustar tus filtros de búsqueda</p>
              <button onClick={clearFilters} className="btn btn-primary">
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Game Modal */}
      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onAddToCart={addToCart}
        />
      )}

      <style jsx>{`
        .games-page {
          padding: 2rem 0;
          min-height: 80vh;
        }

        .games-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .games-subtitle {
          color: var(--text-color);
          opacity: 0.8;
          font-size: 1.2rem;
        }

        .search-filters {
          background: var(--card-bg);
          padding: 2rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          box-shadow: var(--shadow);
        }

        .search-bar {
          margin-bottom: 1.5rem;
        }

        .search-input {
          width: 100%;
          padding: 12px 20px;
          border: 2px solid var(--primary-color);
          border-radius: 8px;
          font-size: 1.1rem;
          outline: none;
          transition: var(--transition);
        }

        .search-input:focus {
          border-color: var(--secondary-color);
          box-shadow: 0 0 0 3px rgba(94, 179, 253, 0.1);
        }

        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .filter-select, .sort-select {
          padding: 8px 12px;
          border: 1px solid var(--primary-color);
          border-radius: 4px;
          background: var(--card-bg);
          color: var(--text-color);
          outline: none;
        }

        .clear-filters {
          background: var(--secondary-color);
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: var(--transition);
        }

        .clear-filters:hover {
          background: var(--primary-color);
        }

        .sort-options {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sort-options label {
          color: var(--text-color);
          font-weight: bold;
        }

        .results-count {
          margin-bottom: 2rem;
          color: var(--text-color);
          font-weight: bold;
        }

        .games-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .game-card {
          background: var(--card-bg);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: var(--transition);
        }

        .game-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }

        .game-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .game-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .rom-badge, .subscription-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: bold;
          color: white;
        }

        .rom-badge {
          background: var(--accent-color);
          color: var(--dark-color);
        }

        .subscription-badge {
          background: var(--primary-color);
        }

        .game-info {
          padding: 1.5rem;
        }

        .game-title {
          margin-bottom: 0.5rem;
          color: var(--text-color);
          font-size: 1.1rem;
        }

        .game-platform {
          background: var(--primary-color);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          display: inline-block;
          margin-bottom: 0.5rem;
        }

        .game-year, .game-stock {
          color: var(--text-color);
          opacity: 0.8;
          margin-bottom: 0.5rem;
        }

        .game-rating {
          color: var(--accent-color);
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .game-price {
          font-size: 1.3rem;
          font-weight: bold;
          color: var(--secondary-color);
          margin-bottom: 1rem;
        }

        .game-actions {
          display: flex;
          gap: 10px;
        }

        .btn-details {
          flex: 1;
          background: var(--primary-color);
          color: white;
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-details:hover {
          background: var(--dark-color);
        }

        .add-to-cart {
          flex: 1;
          background: var(--secondary-color);
          color: white;
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: var(--transition);
        }

        .add-to-cart:hover:not(:disabled) {
          background: var(--primary-color);
        }

        .add-to-cart:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .no-results {
          text-align: center;
          padding: 3rem;
          color: var(--text-color);
          grid-column: 1 / -1;
        }

        @media (max-width: 768px) {
          .filters {
            flex-direction: column;
          }

          .filter-select, .clear-filters {
            width: 100%;
          }

          .sort-options {
            flex-direction: column;
            align-items: flex-start;
          }

          .games-grid {
            grid-template-columns: 1fr;
          }

          .game-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Games;