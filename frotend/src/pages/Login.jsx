import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Logo = '/img/Retro_Pixel_of_Tomorrow.svg';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect si ya está autenticado
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

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

    // Validación de usuario
    if (!formData.username.trim()) {
      newErrors.username = '⚠️ El usuario es requerido';
    } else if (formData.username.length < 3) {
      newErrors.username = '⚠️ El usuario debe tener al menos 3 caracteres';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = '⚠️ Solo letras, números y guiones bajos';
    }

    // Validación de email (solo para registro)
    if (!isLogin) {
      if (!formData.email.trim()) {
        newErrors.email = '⚠️ El email es requerido';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = '⚠️ El email no tiene un formato válido';
      }
    }

    // Validación de contraseña
    if (!formData.password) {
      newErrors.password = '⚠️ La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = '⚠️ La contraseña debe tener al menos 6 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = '⚠️ Debe contener mayúscula, minúscula y número';
    }

    // Validación de confirmación de contraseña (solo para registro)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '⚠️ Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        await login(formData.username, formData.password);
      } else {
        await register(formData.username, formData.email, formData.password);
      }
      navigate('/');
    } catch (error) {
      setErrors({ 
        submit: error.message || 'Error en la autenticación' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const handleGuestLogin = () => {
    setFormData({
      username: 'invitado',
      email: '',
      password: 'invitado123',
      confirmPassword: ''
    });
  };

  return (
    <div className="login-page min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Efectos de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid-background absolute inset-0 opacity-10"></div>
        <div className="floating-pixels absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="pixel absolute w-2 h-2 bg-pink-500 opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <motion.div
        className="login-container w-full max-w-md relative z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >

        {/* Logo vectorizado */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={Logo}
            alt="Retro Pixel Logo"
            className="w-48 mx-auto drop-shadow-[0_0_20px_#FFD700] animate-pulse"
          />
        </motion.div>

        {/* Card de login/registro */}
        <motion.div
          className="auth-card bg-gray-800 bg-opacity-90 backdrop-blur-lg border-4 border-pink-500 rounded-xl shadow-[0_0_30px_#FF00FF] p-8 relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >

          {/* Título con efecto glitch */}
          <motion.h2 
            className="text-3xl font-bold text-yellow-400 mb-6 text-center pixel-font drop-shadow-[0_0_10px_#FFD700] relative"
            data-text={isLogin ? "🔑 Iniciar Sesión" : "📝 Registrarse"}
            whileHover={{ scale: 1.05 }}
          >
            {isLogin ? "🔑 Iniciar Sesión" : "📝 Registrarse"}
          </motion.h2>

          {/* Tabs de modo */}
          <div className="auth-tabs flex mb-6 bg-black rounded-lg p-1">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 font-bold ${
                isLogin 
                  ? 'bg-yellow-400 text-black shadow-[0_0_10px_#FFD700]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 font-bold ${
                !isLogin 
                  ? 'bg-pink-500 text-white shadow-[0_0_10px_#FF00FF]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Campo Usuario */}
            <motion.div
              className="input-group"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <label className="block text-sm font-bold text-gray-300 mb-2">
                👤 Usuario
              </label>
              <input
                type="text"
                name="username"
                placeholder="Ingresa tu usuario"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg bg-black text-white border-2 transition-all duration-300 focus:ring-2 focus:ring-yellow-300 ${
                  errors.username 
                    ? 'border-red-500 focus:border-red-400' 
                    : 'border-pink-500 focus:border-yellow-400'
                }`}
                disabled={isLoading}
              />
              {errors.username && (
                <motion.p 
                  className="text-red-400 text-sm mt-1 animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.username}
                </motion.p>
              )}
            </motion.div>

            {/* Campo Email (solo registro) */}
            {!isLogin && (
              <motion.div
                className="input-group"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  📧 Email
                </label>
                <input
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
                  disabled={isLoading}
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
              </motion.div>
            )}

            {/* Campo Contraseña */}
            <motion.div
              className="input-group"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <label className="block text-sm font-bold text-gray-300 mb-2">
                🔒 Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full p-3 pr-12 rounded-lg bg-black text-white border-2 transition-all duration-300 focus:ring-2 focus:ring-yellow-300 ${
                    errors.password 
                      ? 'border-red-500 focus:border-red-400' 
                      : 'border-pink-500 focus:border-yellow-400'
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <motion.p 
                  className="text-red-400 text-sm mt-1 animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Campo Confirmar Contraseña (solo registro) */}
            {!isLogin && (
              <motion.div
                className="input-group"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.9 }}
              >
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  🔒 Confirmar Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full p-3 pr-12 rounded-lg bg-black text-white border-2 transition-all duration-300 focus:ring-2 focus:ring-yellow-300 ${
                      errors.confirmPassword 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-pink-500 focus:border-yellow-400'
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p 
                    className="text-red-400 text-sm mt-1 animate-pulse"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Error general */}
            {errors.submit && (
              <motion.div
                className="error-message bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 text-red-400 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {errors.submit}
              </motion.div>
            )}

            {/* Botón principal */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 mt-6 font-bold border-2 border-black rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.5)] active:scale-95 ${
                isLoading
                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  : isLogin
                    ? 'bg-yellow-400 text-black hover:bg-pink-500 hover:text-white hover:shadow-[0_0_15px_rgba(255,0,255,0.5)]'
                    : 'bg-pink-500 text-white hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]'
              }`}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full"></div>
                  Procesando...
                </span>
              ) : (
                isLogin ? 'Entrar al Juego' : 'Crear Cuenta'
              )}
            </motion.button>

            {/* Botón invitado (solo login) */}
            {isLogin && (
              <motion.button
                type="button"
                onClick={handleGuestLogin}
                className="w-full py-2 mt-3 text-gray-400 hover:text-white transition-colors border border-gray-600 rounded-lg hover:border-gray-400"
                whileHover={{ scale: 1.02 }}
              >
                🎮 Entrar como Invitado
              </motion.button>
            )}
          </form>

          {/* Link de cambio de modo */}
          <motion.div
            className="text-center mt-6 pt-4 border-t border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-gray-400">
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-2 text-yellow-400 hover:text-pink-500 font-bold transition-colors"
              >
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
              </button>
            </p>
          </motion.div>

          {/* Link de regreso */}
          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Link
              to="/"
              className="text-gray-500 hover:text-white transition-colors text-sm"
            >
              ← Volver al inicio
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;