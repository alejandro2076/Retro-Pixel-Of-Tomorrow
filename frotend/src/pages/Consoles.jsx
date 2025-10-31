import React, { useState } from 'react';
import { consoles } from '../mockData';
import { useCart } from '../Context/CartContext';

const Consoles = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedConsole, setSelectedConsole] = useState(null);
  const { addToCart } = useCart();

  const filteredConsoles = selectedType === 'all' 
    ? consoles 
    : consoles.filter(console => console.type === selectedType);

  const handleDownloadEmulator = (emulator) => {
    alert(`Descargando ${emulator.name}...`);
    // En una implementación real, aquí se descargaría el emulador
    window.open(emulator.downloadLink, '_blank');
  };

  return (
    <div className="consoles-page">
      <div className="container">
        <div className="consoles-header">
          <h1 className="section-title">Consolas de Videojuegos</h1>
          <p className="consoles-subtitle">
            Desde las clásicas retro hasta las más modernas consolas actuales
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="console-filters">
          <button 
            className={`filter-tab ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedType('all')}
          >
            Todas las Consolas
          </button>
          <button 
            className={`filter-tab ${selectedType === 'retro' ? 'active' : ''}`}
            onClick={() => setSelectedType('retro')}
          >
            Consolas Retro
          </button>
          <button 
            className={`filter-tab ${selectedType === 'current' ? 'active' : ''}`}
            onClick={() => setSelectedType('current')}
          >
            Consolas Actuales
          </button>
        </div>

        {/* Consoles Grid */}
        <div className="consoles-grid">
          {filteredConsoles.map(console => (
            <div key={console.id} className="console-card">
              <div className="console-image">
                <img src={console.image} alt={console.name} loading="lazy" />
                <div className="console-type-badge">
                  {console.type === 'retro' ? 'RETRO' : 'ACTUAL'}
                </div>
              </div>
              
              <div className="console-info">
                <h3 className="console-title">{console.name}</h3>
                <div className="console-year">Año: {console.year}</div>
                <div className="console-price">${console.price}</div>
                <div className="console-stock">Stock: {console.stock} unidades</div>
                <p className="console-description">{console.description}</p>
                
                {console.emulators && console.emulators.length > 0 && (
                  <div className="emulators-section">
                    <h4>Emuladores Disponibles:</h4>
                    <div className="emulators-list">
                      {console.emulators.map((emulator, index) => (
                        <div key={index} className="emulator-item">
                          <span className="emulator-name">{emulator.name}</span>
                          <button
                            className="download-emulator"
                            onClick={() => handleDownloadEmulator(emulator)}
                          >
                            Descargar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="console-actions">
                  <button
                    className="btn-details"
                    onClick={() => setSelectedConsole(console)}
                  >
                    Ver Detalles
                  </button>
                  <button
                    className="add-to-cart"
                    onClick={() => addToCart({
                      ...console,
                      name: console.name,
                      platform: 'Console'
                    })}
                    disabled={console.stock === 0}
                  >
                    {console.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emulators Info Section */}
        <div className="emulators-info">
          <div className="info-card">
            <h2>¿Qué son los Emuladores?</h2>
            <p>
              Los emuladores son programas que permiten ejecutar juegos de consolas retro en tu computadora. 
              Son perfectos para revivir esos clásicos juegos que marcaron una época.
            </p>
            <div className="emulator-benefits">
              <h3>Beneficios de usar emuladores:</h3>
              <ul>
                <li>✅ Preservación de juegos clásicos</li>
                <li>✅ Mejora de gráficos y rendimiento</li>
                <li>✅ Funciones adicionales como save states</li>
                <li>✅ Controles personalizables</li>
                <li>✅ Compatibilidad con mandos modernos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Console Details Modal */}
      {selectedConsole && (
        <div className="console-modal-backdrop" onClick={() => setSelectedConsole(null)}>
          <div className="console-modal" onClick={(e) => e.stopPropagation()}>
            <div className="console-modal-header">
              <h2>{selectedConsole.name}</h2>
              <button className="close-modal" onClick={() => setSelectedConsole(null)}>×</button>
            </div>
            
            <div className="console-modal-content">
              <div className="console-modal-image">
                <img src={selectedConsole.image} alt={selectedConsole.name} />
              </div>
              
              <div className="console-modal-info">
                <div className="console-price-large">${selectedConsole.price}</div>
                <div className="console-year-large">Lanzada en {selectedConsole.year}</div>
                <div className="console-stock-large">Stock: {selectedConsole.stock} unidades</div>
                
                <div className="console-description-full">
                  <h4>Descripción:</h4>
                  <p>{selectedConsole.description}</p>
                </div>
                
                {selectedConsole.emulators && selectedConsole.emulators.length > 0 && (
                  <div className="emulators-section-modal">
                    <h4>Emuladores Recomendados:</h4>
                    <div className="emulators-grid">
                      {selectedConsole.emulators.map((emulator, index) => (
                        <div key={index} className="emulator-card">
                          <h5>{emulator.name}</h5>
                          <button
                            className="btn btn-secondary"
                            onClick={() => handleDownloadEmulator(emulator)}
                          >
                            Descargar Gratis
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="console-modal-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      addToCart({
                        ...selectedConsole,
                        name: selectedConsole.name,
                        platform: 'Console'
                      });
                      setSelectedConsole(null);
                    }}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .consoles-page {
          padding: 2rem 0;
          min-height: 80vh;
        }

        .consoles-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .consoles-subtitle {
          color: var(--text-color);
          opacity: 0.8;
          font-size: 1.2rem;
        }

        .console-filters {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .filter-tab {
          padding: 12px 24px;
          border: 2px solid var(--primary-color);
          background: transparent;
          color: var(--primary-color);
          border-radius: 8px;
          cursor: pointer;
          transition: var(--transition);
          font-weight: bold;
        }

        .filter-tab.active, .filter-tab:hover {
          background: var(--primary-color);
          color: white;
        }

        .consoles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .console-card {
          background: var(--card-bg);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: var(--transition);
        }

        .console-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }

        .console-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .console-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .console-type-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: bold;
          color: white;
          background: var(--secondary-color);
        }

        .console-info {
          padding: 1.5rem;
        }

        .console-title {
          margin-bottom: 0.5rem;
          color: var(--text-color);
          font-size: 1.3rem;
        }

        .console-year {
          color: var(--text-color);
          opacity: 0.8;
          margin-bottom: 0.5rem;
        }

        .console-price {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--secondary-color);
          margin-bottom: 0.5rem;
        }

        .console-stock {
          color: var(--text-color);
          opacity: 0.8;
          margin-bottom: 1rem;
        }

        .console-description {
          line-height: 1.6;
          color: var(--text-color);
          margin-bottom: 1.5rem;
        }

        .emulators-section {
          background: rgba(94, 179, 253, 0.1);
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1.5rem;
        }

        .emulators-section h4 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }

        .emulators-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .emulator-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .emulator-name {
          font-weight: bold;
          color: var(--text-color);
        }

        .download-emulator {
          background: var(--accent-color);
          color: var(--dark-color);
          padding: 4px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: var(--transition);
        }

        .download-emulator:hover {
          background: var(--secondary-color);
          color: white;
        }

        .console-actions {
          display: flex;
          gap: 10px;
        }

        .btn-details {
          flex: 1;
          background: var(--primary-color);
          color: white;
          padding: 10px 15px;
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
          padding: 10px 15px;
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

        .emulators-info {
          background: var(--card-bg);
          border-radius: 8px;
          box-shadow: var(--shadow);
        }

        .info-card {
          padding: 2rem;
        }

        .info-card h2 {
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .info-card p {
          line-height: 1.6;
          color: var(--text-color);
          margin-bottom: 1.5rem;
        }

        .emulator-benefits h3 {
          color: var(--secondary-color);
          margin-bottom: 1rem;
        }

        .emulator-benefits ul {
          list-style: none;
          padding: 0;
        }

        .emulator-benefits li {
          color: var(--text-color);
          margin-bottom: 0.5rem;
          padding-left: 1rem;
        }

        /* Modal Styles */
        .console-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          padding: 20px;
        }

        .console-modal {
          background-color: var(--card-bg);
          border-radius: 8px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          color: var(--text-color);
        }

        .console-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eee;
        }

        .console-modal-header h2 {
          margin: 0;
          color: var(--primary-color);
        }

        .close-modal {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: var(--text-color);
        }

        .console-modal-content {
          display: flex;
          padding: 20px;
          gap: 20px;
        }

        .console-modal-image {
          flex: 0 0 300px;
        }

        .console-modal-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 8px;
        }

        .console-modal-info {
          flex: 1;
        }

        .console-price-large {
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--secondary-color);
          margin-bottom: 10px;
        }

        .console-year-large, .console-stock-large {
          margin-bottom: 10px;
          color: var(--text-color);
          font-size: 1.1rem;
        }

        .console-description-full {
          margin: 20px 0;
        }

        .console-description-full h4 {
          color: var(--primary-color);
          margin-bottom: 10px;
        }

        .emulators-section-modal {
          margin: 20px 0;
        }

        .emulators-section-modal h4 {
          color: var(--primary-color);
          margin-bottom: 15px;
        }

        .emulators-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
        }

        .emulator-card {
          background: rgba(94, 179, 253, 0.1);
          padding: 15px;
          border-radius: 8px;
          text-align: center;
        }

        .emulator-card h5 {
          margin-bottom: 10px;
          color: var(--text-color);
        }

        .console-modal-actions {
          margin-top: 20px;
        }

        .console-modal-actions .btn {
          width: 100%;
          padding: 15px;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .console-filters {
            flex-direction: column;
            align-items: center;
          }

          .consoles-grid {
            grid-template-columns: 1fr;
          }

          .console-actions {
            flex-direction: column;
          }

          .console-modal-content {
            flex-direction: column;
          }

          .console-modal-image {
            flex: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Consoles;