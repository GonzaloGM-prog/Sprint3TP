# 🎮 Tienda de Videojuegos

🔗 **Demo:** https://tu-app.netlify.app

## Qué es

Tienda online de videojuegos con catálogo, carrito con cantidades y checkout completo.
Permite agregar productos, controlar stock, y finalizar la compra con un formulario validado.

## Cómo correrlo

```bash
pnpm install && pnpm run dev
```

## Mis contextos

**CarritoContext**
Guarda el carrito (items con cantidad), el total y la cantidad total de unidades. Lo consumen Navbar (badge), CarritoModal, CarritoItem, ProductoCard, ResumenPedido y Checkout. Es global porque el carrito se necesita en partes del árbol que no tienen relación directa entre sí: la barra de navegación y el formulario de pago están a niveles completamente distintos.

**ThemeContext**
Guarda el tema activo (oscuro o claro) y la función para alternarlo. Lo consume únicamente Navbar. Es global porque el tema afecta a toda la UI mediante la clase `dark` en el `<html>`, y necesita persistirse en localStorage sin que ningún componente sea dueño de esa lógica.

## Mis hooks

**useCarrito**
Maneja toda la lógica del carrito: agregar, cambiar cantidad, quitar y vaciar. Devuelve `{ carrito, cantidadTotal, total, cantidadDe, estaEnElCarrito, agregar, cambiarCantidad, quitar, vaciar }`. El carrito se persiste automáticamente gracias a que usa `useLocalStorage` internamente.

**useLocalStorage**
Sincroniza un `useState` con `localStorage`. Devuelve `[value, setValue, removeItem]`, igual que un `useState` normal pero con persistencia automática entre recargas. Lo usan `useCarrito` y `ThemeContext`.

**useToggle**
Alterna un booleano entre `true` y `false`. Devuelve `[value, toggle]`. Lo usa `App` para controlar si el modal del carrito está abierto o cerrado.

## Decisiones de estado

El buscador (`busqueda`) vive en un `useState` local dentro de `Tienda.jsx` y no está en ningún contexto. Solo lo usan `Tienda` y su hijo directo `SearchBar`, así que no hay ningún motivo para hacerlo global. Meterlo en un contexto hubiera sido sobreingeniería: cada vez que el usuario escribe, solo se rerenderiza esa sección del árbol, no toda la app.

El estado de navegación (`vista`) también vive en `App.jsx` como `useState`. Las vistas no se necesitan en componentes profundos, se manejan todas desde el mismo nivel, así que no justifica un contexto.

## Prop drilling: antes y después

Antes de usar Context, el carrito hubiera tenido que bajar así para llegar a `ProductoCard`:
`App → main → Tienda → ProductoList → ProductoCard` (4 niveles, 4 componentes recibiendo props que no les pertenecen).

Después de Context: `ProductoCard` llama a `useCarritoContext()` directamente. Cero props de carrito pasando de largo en toda la cadena.

## Qué generé con IA

Usé IA para generar la estructura inicial de los componentes de UI (estilos de Tailwind, layout de las cards y del modal) y para completar los campos `price` y `stock` en el archivo `productos.js`. Corregí a mano un error crítico que la IA introdujo: los datos tenían el campo como `precio` pero todo el código usaba `price`, lo que hacía que todos los precios fueran `undefined` en runtime. 
