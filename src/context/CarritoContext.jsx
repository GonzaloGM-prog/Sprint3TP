import { createContext, useContext, useEffect } from "react";
import useCarrito from "../hooks/useCarrito";

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const carrito = useCarrito();
  const { cantidadTotal } = carrito;

  useEffect(() => {
    document.title =
      cantidadTotal > 0
        ? `Carrito (${cantidadTotal}) | Tienda de videojuegos`
        : "Tienda de videojuegos";
  }, [cantidadTotal]);

  return (
    <CarritoContext.Provider value={carrito}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarritoContext() {
  const contexto = useContext(CarritoContext);

  if (contexto === null) {
    throw new Error("useCarritoContext solo se puede usar dentro de un <CarritoProvider>");
  }

  return contexto;
}
