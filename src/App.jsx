import { useState } from "react";
import { VISTAS } from "./data/vistas";
import useToggle from "./hooks/useToggle";

import Navbar from "./components/layout/Navbar";
import CarritoModal from "./components/CarritoModal";
import Tienda from "./components/views/Tienda";
import Checkout from "./components/views/Checkout";
import Confirmacion from "./components/views/Confirmacion";

function App() {
  const [vista, setVista] = useState(VISTAS.TIENDA);
  const [pedido, setPedido] = useState(null);
  const [carritoAbierto, alternarCarrito] = useToggle(false);

  const irATienda = () => setVista(VISTAS.TIENDA);

  const irACheckout = () => {
    alternarCarrito();
    setVista(VISTAS.CHECKOUT);
  };

  const confirmarPedido = (nuevoPedido) => {
    setPedido(nuevoPedido);
    setVista(VISTAS.CONFIRMACION);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <header>
        <Navbar abrirCarrito={alternarCarrito} />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {vista === VISTAS.TIENDA && <Tienda />}
        {vista === VISTAS.CHECKOUT && (
          <Checkout volver={irATienda} confirmar={confirmarPedido} />
        )}
        {vista === VISTAS.CONFIRMACION && (
          <Confirmacion pedido={pedido} volver={irATienda} />
        )}
      </main>

      {carritoAbierto && (
        <CarritoModal cerrar={alternarCarrito} irACheckout={irACheckout} />
      )}
    </div>
  );
}

export default App;
