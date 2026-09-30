import useLocalStorage from "./useLocalStorage";
import productos from "../data/productos";

const STORAGE_KEY = "videojuegos:carrito:v2";
const PRODUCTOS_POR_ID = new Map(productos.map((producto) => [producto.id, producto]));

const stockDe = (id) => PRODUCTOS_POR_ID.get(id)?.stock ?? 0;

function useCarrito() {
  const [items, setItems] = useLocalStorage(STORAGE_KEY, []);

  const carrito = items
    .filter((item) => PRODUCTOS_POR_ID.has(item.id))
    .map((item) => ({ ...PRODUCTOS_POR_ID.get(item.id), cantidad: item.cantidad }));

  const cantidadTotal = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);
  const total = carrito.reduce((acumulado, item) => acumulado + item.price * item.cantidad, 0);

  const cantidadDe = (id) =>
    items.reduce((acumulado, item) => (item.id === id ? item.cantidad : acumulado), 0);

  const estaEnElCarrito = (id) => cantidadDe(id) > 0;

  const agregar = (id) => {
    if (stockDe(id) < 1) return;

    setItems((anterior) => {
      const yaEsta = anterior.some((item) => item.id === id);

      if (!yaEsta) {
        return [...anterior, { id, cantidad: 1 }];
      }

      return anterior.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.min(item.cantidad + 1, stockDe(id)) }
          : item
      );
    });
  };

  const cambiarCantidad = (id, diferencia) => {
    setItems((anterior) =>
      anterior
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: Math.min(item.cantidad + diferencia, stockDe(id)) }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const quitar = (id) => {
    setItems((anterior) => anterior.filter((item) => item.id !== id));
  };

  const vaciar = () => {
    setItems([]);
  };

  return {
    carrito,
    cantidadTotal,
    total,
    cantidadDe,
    estaEnElCarrito,
    agregar,
    cambiarCantidad,
    quitar,
    vaciar,
  };
}

export default useCarrito;