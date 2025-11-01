import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';

describe('Login', () => {
  it('renderiza el formulario de login', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar al juego/i })).toBeInTheDocument();
  });

  it('muestra error si el usuario está vacío', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /entrar al juego/i }));
    expect(screen.getByText(/usuario es requerido/i)).toBeInTheDocument();
  });
});
