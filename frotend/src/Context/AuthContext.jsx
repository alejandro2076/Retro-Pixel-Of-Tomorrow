import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    // Validación básica de usuario y contraseña
    if (!username || !password) {
      throw new Error('Usuario y contraseña son requeridos');
    }

    // Validación de formato
    if (username.length < 3) {
      throw new Error('El usuario debe tener al menos 3 caracteres');
    }

    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // Simulación de autenticación (en producción sería una llamada al backend)
    if (username === 'admin' && password === 'admin123') {
      const userData = {
        id: 1,
        username: 'admin',
        email: 'admin@retroPixel.com',
        role: 'admin'
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } else if (username === 'user' && password === 'user123') {
      const userData = {
        id: 2,
        username: 'user',
        email: 'user@retroPixel.com',
        role: 'user'
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } else {
      throw new Error('Credenciales incorrectas');
    }
  };

  const register = async (username, email, password, confirmPassword) => {
    // Validaciones
    if (!username || !email || !password || !confirmPassword) {
      throw new Error('Todos los campos son requeridos');
    }

    if (username.length < 3) {
      throw new Error('El usuario debe tener al menos 3 caracteres');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('El email no tiene un formato válido');
    }

    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    if (password !== confirmPassword) {
      throw new Error('Las contraseñas no coinciden');
    }

    // Simulación de registro
    const userData = {
      id: Date.now(),
      username,
      email,
      role: 'user'
    };
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};