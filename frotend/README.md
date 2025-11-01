# Retro Pixel of Tomorrow

A modern React web frontend for a retro and current videogame store. Ideal for professional portfolios and learning best practices in React, accessibility, and performance.

---

Proyecto web frontend para tienda de videojuegos retro y actuales. Ideal para portafolio profesional y aprendizaje de buenas prácticas modernas en React.

## Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd Retro-Pixel-Of-Tomorrow/frotend
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```
4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del proyecto
- `src/` - Código fuente principal
  - `components/` - Componentes reutilizables y de UI
    - `ui/` - Componentes atómicos y de interfaz (botón, input, modal, etc.)
    - `RetroBackground.jsx` - Fondo animado retro global
    - `GameModal.jsx` - Modal de detalles de juego
    - `Cart.jsx` - Carrito de compras
    - `Header.jsx` - Barra de navegación principal
    - `SoundtrackCarousel.jsx` - Carrusel de música
  - `pages/` - Vistas principales (Home, Games, Consoles, Contact)
  - `Context/` - Contextos globales (Carrito, Auth)
  - `hooks/` - Hooks personalizados
  - `lib/` - Utilidades y helpers
  - `utils/` - Funciones utilitarias (ej: sanitización de datos)
  - `audio/` - Archivos de música
- `public/img/` - Imágenes y assets optimizados (webp/svg)
- `build/` - Archivos generados tras el build de producción

## Estilo visual
- Fondo global con gradiente retro y píxeles flotantes.
- Paleta de colores: gris oscuro, acentos en amarillo, rosa, cian, verde y púrpura.
- Accesibilidad mejorada en menús, botones, formularios e imágenes.
- Diseño responsivo y animaciones suaves.

## Buenas prácticas y mejoras implementadas
- Fondo retro animado unificado en todas las vistas y componentes secundarios.
- Accesibilidad en navegación, formularios y controles (etiquetas, ARIA, feedback visual).
- Optimización de imágenes (formatos modernos, lazy loading, atributos de tamaño).
- Validación y sanitización de datos en formularios.
- Estructura de carpetas modular y mantenible.
- Memoización de componentes clave para performance.
- Feedback visual y mensajes accesibles en acciones del usuario.
- Responsividad mejorada en móviles y tablets.
- Utilidades centralizadas en `utils/` para sanitización y helpers.
- Código comentado y organizado para facilitar contribuciones.
- Accesibilidad y performance revisadas en todos los componentes principales.

## Próximos pasos sugeridos
- [ ] Implementar tests unitarios y de integración para componentes clave.
- [ ] Documentar componentes y hooks personalizados con JSDoc.
- [ ] Mejorar animaciones y microinteracciones (hover, focus, feedback visual).
- [ ] Revisar performance en componentes secundarios (`React.memo`, `useMemo` donde aplique).
- [ ] Agregar mensajes de error y éxito accesibles en todas las acciones del usuario.
- [ ] Agregar sección de preguntas frecuentes (FAQ).
- [ ] Mejorar la página de contacto con integración real de email/envío.
- [ ] Agregar modo demo o tour interactivo para nuevos usuarios.
- [ ] Revisar y actualizar dependencias del proyecto.

## Testing

- Los tests están ubicados en `src/__tests__/` y usan React Testing Library.
- Para ejecutar los tests:
  ```bash
  npm test
  ```
- Ejemplo de test:
  ```js
  // src/__tests__/Login.test.jsx
  import { render, screen } from '@testing-library/react';
  import Login from '../pages/Login';
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
  });
  ```

## Limpieza del proyecto

Para limpiar archivos generados y dependencias:
```bash
rd /s /q build node_modules
```
Luego reinstala dependencias con `npm install`.

## Troubleshooting (Solución de problemas)

- **Error "Unexpected token '<'"**: Usualmente causado por un import incorrecto o archivo faltante/corrupto. Verifica rutas y archivos estáticos.
- **UI bloqueada por overlays/modals**: Revisa el z-index y `pointer-events` en componentes como `RetroBackground` y modales.
- **Problemas de dependencias**: Ejecuta `npm install` y revisa versiones en `package.json`.

## Contribución

¡Contribuciones son bienvenidas! Por favor:
- Sigue la estructura de carpetas y convenciones de código.
- Usa comentarios y JSDoc para documentar componentes y hooks.
- Asegúrate de que los tests pasen antes de hacer un PR.
- Consulta el archivo `PENDIENTES.md` para ver el roadmap y tareas sugeridas.

## Autor
- Proyecto realizado por Jorge Ledezma
- [www.linkedin.com/in/jorge-ledezma-1338a9326](https://www.linkedin.com/in/jorge-ledezma-1338a9326)

---

Para pendientes y roadmap, revisa el archivo `PENDIENTES.md`.
