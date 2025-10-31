import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);

  // Coordenadas específicas (ejemplo: Madrid, España)
  const coordinates = {
    lat: 40.4168,
    lng: -3.7038
  };

  // Inicializar Google Maps
  useEffect(() => {
    const initMap = () => {
      if (window.google && mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: coordinates,
          zoom: 15,
          styles: [
            // Estilo oscuro para el mapa (tema retro)
            {
              "elementType": "geometry",
              "stylers": [{"color": "#212121"}]
            },
            {
              "elementType": "labels.icon",
              "stylers": [{"visibility": "off"}]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#757575"}]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [{"color": "#212121"}]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [{"color": "#757575"}]
            },
            {
              "featureType": "administrative.country",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#9ca5b3"}]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [{"color": "#2c2c54"}]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#757575"}]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [{"color": "#000000"}]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#3d3d3d"}]
            }
          ]
        });

        // Marcador personalizado
        const marker = new window.google.maps.Marker({
          position: coordinates,
          map: map,
          title: 'Retro Pixel Games Store',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#FF00FF" stroke="#FFD700" stroke-width="2"/>
                <text x="20" y="26" text-anchor="middle" fill="white" font-size="16" font-weight="bold">🎮</text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(40, 40)
          }
        });

        // Info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="color: #333; font-family: Arial, sans-serif; padding: 10px;">
              <h3 style="color: #FF00FF; margin: 0 0 10px 0;">🎮 Retro Pixel Games</h3>
              <p style="margin: 5px 0;"><strong>📍 Dirección:</strong> Calle Gamer 123, Madrid</p>
              <p style="margin: 5px 0;"><strong>📞 Teléfono:</strong> +34 123 456 789</p>
              <p style="margin: 5px 0;"><strong>🕒 Horario:</strong> L-V 10:00-20:00</p>
              <p style="margin: 5px 0;"><strong>📧 Email:</strong> info@retropixel.com</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        googleMapRef.current = map;
      }
    };

    // Cargar Google Maps API si no está cargada
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      // Cleanup
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validación de nombre
    if (!formData.name.trim()) {
      newErrors.name = '⚠️ El nombre es requerido';
    } else if (formData.name.length < 2) {
      newErrors.name = '⚠️ El nombre debe tener al menos 2 caracteres';
    }

    // Validación de email
    if (!formData.email.trim()) {
      newErrors.email = '⚠️ El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '⚠️ El email no tiene un formato válido';
    }

    // Validación de asunto
    if (!formData.subject.trim()) {
      newErrors.subject = '⚠️ El asunto es requerido';
    }

    // Validación de mensaje
    if (!formData.message.trim()) {
      newErrors.message = '⚠️ El mensaje es requerido';
    } else if (formData.message.length < 10) {
      newErrors.message = '⚠️ El mensaje debe tener al menos 10 caracteres';
    }

    // Validación de teléfono (opcional pero si se proporciona debe ser válido)
    if (formData.phone && !/^[+]?[\d\s\-\(\)]{9,}$/.test(formData.phone)) {
      newErrors.phone = '⚠️ El teléfono no tiene un formato válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simular envío del formulario (aquí integrarías con tu backend)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simular respuesta exitosa
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        phone: ''
      });

      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Dirección',
      content: 'Calle Gamer 123, 28001 Madrid, España',
      color: 'text-pink-400'
    },
    {
      icon: '📞',
      title: 'Teléfono',
      content: '+34 123 456 789',
      color: 'text-yellow-400'
    },
    {
      icon: '📧',
      title: 'Email',
      content: 'info@retropixel.com',
      color: 'text-green-400'
    },
    {
      icon: '🕒',
      title: 'Horario',
      content: 'Lunes a Viernes: 10:00 - 20:00\nSábados: 10:00 - 18:00\nDomingos: Cerrado',
      color: 'text-blue-400'
    }
  ];

  return (
    <div className="contact-page min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 py-16 relative overflow-hidden">

      {/* Efectos de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid-background absolute inset-0 opacity-10"></div>
        <div className="floating-pixels absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="pixel absolute w-2 h-2 bg-pink-500 opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Título principal */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 pixel-font drop-shadow-[0_0_20px_#FFD700] mb-4">
            📞 Contáctanos
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta sobre nuestros juegos retro? ¡Estamos aquí para ayudarte!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Formulario de contacto */}
          <motion.div
            className="contact-form-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="form-container bg-gray-800 bg-opacity-90 backdrop-blur-lg border-4 border-pink-500 rounded-xl shadow-[0_0_30px_#FF00FF] p-8">

              <h2 className="text-3xl font-bold text-pink-400 mb-6 pixel-font">
                💌 Envíanos un Mensaje
              </h2>

              {/* Estado del envío */}
              {submitStatus === 'success' && (
                <motion.div
                  className="success-message bg-green-500 bg-opacity-20 border border-green-500 rounded-lg p-4 mb-6 text-green-400"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  ✅ ¡Mensaje enviado correctamente! Te responderemos pronto.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="error-message bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-4 mb-6 text-red-400"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  ❌ Error al enviar el mensaje. Inténtalo de nuevo.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulario de contacto">

                {/* Nombre */}
                <div className="input-group">
                  <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor="contact-name">
                    👤 Nombre *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-lg bg-black text-white border-2 transition-all duration-300 focus:ring-2 focus:ring-yellow-300 ${
                      errors.name 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-pink-500 focus:border-yellow-400'
                    }`}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <motion.p 
                      className="text-red-400 text-sm mt-1 animate-pulse"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email */}
                <div className="input-group">
                  <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor="contact-email">
                    📧 Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-lg bg-black text-white border-2 transition-all duration-300 focus:ring-2 focus:ring-yellow-300 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-pink-500 focus:border-yellow-400'
                    }`}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <motion.p 
                      className="text-red-400 text-sm mt-1 animate-pulse"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Teléfono */}
                <div className="input-group">
                  <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor="contact-phone">
                    📞 Teléfono (opcional)
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    placeholder="+34 123 456 789"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-lg bg-black text-white border-2 transition-all duration-300 focus:ring-2 focus:ring-yellow-300 ${
                      errors.phone 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-pink-500 focus:border-yellow-400'
                    }`}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <motion.p 
                      className="text-red-400 text-sm mt-1 animate-pulse"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </div>

                {/* Asunto */}
                <div className="input-group">
                  <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor="contact-subject">
                    📝 Asunto *
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-lg bg-black text-white border-2 transition-all duration-300 focus:ring-2 focus:ring-yellow-300 ${
                      errors.subject 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-pink-500 focus:border-yellow-400'
                    }`}
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="consulta-general">Consulta General</option>
                    <option value="soporte-tecnico">Soporte Técnico</option>
                    <option value="pedidos">Información sobre Pedidos</option>
                    <option value="devoluciones">Devoluciones y Cambios</option>
                    <option value="sugerencias">Sugerencias</option>
                    <option value="colaboracion">Colaboración</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.subject && (
                    <motion.p 
                      className="text-red-400 text-sm mt-1 animate-pulse"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </div>

                {/* Mensaje */}
                <div className="input-group">
                  <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor="contact-message">
                    💬 Mensaje *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Escribe tu mensaje aquí..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    className={`w-full p-3 rounded-lg bg-black text-white border-2 transition-all duration-300 focus:ring-2 focus:ring-yellow-300 resize-vertical ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-pink-500 focus:border-yellow-400'
                    }`}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <motion.p 
                      className="text-red-400 text-sm mt-1 animate-pulse"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Botón enviar */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 font-bold border-2 border-black rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.5)] ${
                    isSubmitting
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      : 'bg-yellow-400 text-black hover:bg-pink-500 hover:text-white hover:shadow-[0_0_15px_rgba(255,0,255,0.5)]'
                  }`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full"></div>
                      Enviando...
                    </span>
                  ) : (
                    '🚀 Enviar Mensaje'
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Información de contacto y mapa */}
          <motion.div
            className="contact-info-section space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >

            {/* Información de contacto */}
            <div className="contact-info bg-gray-800 bg-opacity-90 backdrop-blur-lg border-4 border-yellow-400 rounded-xl shadow-[0_0_30px_#FFD700] p-8">
              <h2 className="text-3xl font-bold text-yellow-400 mb-6 pixel-font">
                📍 Información de Contacto
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="contact-item flex items-start gap-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="icon text-3xl">{info.icon}</div>
                    <div>
                      <h3 className={`font-bold ${info.color} mb-1`}>{info.title}</h3>
                      <p className="text-gray-300 whitespace-pre-line">{info.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mapa de Google */}
            <div className="map-container bg-gray-800 bg-opacity-90 backdrop-blur-lg border-4 border-green-400 rounded-xl shadow-[0_0_30px_#00FF00] p-8">
              <h2 className="text-3xl font-bold text-green-400 mb-6 pixel-font">
                🗺️ Nuestra Ubicación
              </h2>

              <div className="map-wrapper">
                <div
                  ref={mapRef}
                  className="google-map w-full h-80 rounded-lg border-2 border-gray-600"
                  style={{ minHeight: '320px' }}
                />

                {/* Fallback si no carga el mapa */}
                <div className="map-fallback mt-4 p-4 bg-gray-700 rounded-lg">
                  <p className="text-gray-300 text-sm">
                    📍 Si el mapa no se carga, puedes encontrarnos en: <br/>
                    <strong className="text-white">Calle Gamer 123, 28001 Madrid, España</strong>
                  </p>
                  <a
                    href={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-400 hover:text-blue-300 underline"
                  >
                    🔗 Ver en Google Maps
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sección adicional: Redes sociales */}
        <motion.div
          className="social-section mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-pink-400 mb-8 pixel-font">
            🌐 Síguenos en Redes Sociales
          </h2>

          <div className="social-links flex justify-center gap-6 flex-wrap">
            {[
              { name: 'Facebook', icon: '📘', url: '#', color: 'hover:text-blue-500' },
              { name: 'Twitter', icon: '🐦', url: '#', color: 'hover:text-blue-400' },
              { name: 'Instagram', icon: '📷', url: '#', color: 'hover:text-pink-500' },
              { name: 'YouTube', icon: '📺', url: '#', color: 'hover:text-red-500' },
              { name: 'Discord', icon: '🎮', url: '#', color: 'hover:text-purple-500' },
              { name: 'TikTok', icon: '🎵', url: '#', color: 'hover:text-pink-400' }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                className={`social-link bg-gray-800 p-4 rounded-full border-2 border-gray-600 hover:border-white transition-all duration-300 text-white ${social.color} text-2xl`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;