import { useCarritoContext } from "../context/CarritoContext";
import { formatearPrecio } from "../utils/formato";
import Modal from "./ui/Modal";
import CarritoItem from "./CarritoItem";

function CarritoModal({ cerrar, irACheckout }) {
  const { carrito, cantidadTotal, total, vaciar } = useCarritoContext();
  const vacio = carrito.length === 0;

  const confirmarVaciado = () => {
    if (confirm("¿Seguro que querés vaciar tu carrito?")) {
      vaciar();
    }
  };

  const pie = (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Total ({cantidadTotal} {cantidadTotal === 1 ? "unidad" : "unidades"})
        </p>
        <p className="text-slate-900 dark:text-white text-lg font-bold">
          {formatearPrecio(total)}
        </p>
      </div>

      <button
        type="button"
        onClick={irACheckout}
        disabled={vacio}
        className="w-full px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-all duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
      >
        Ir al checkout
      </button>

      {!vacio && (
        <button
          type="button"
          onClick={confirmarVaciado}
          className="w-full px-4 py-2.5 bg-red-500/10 border border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-500/20 text-sm font-semibold rounded-lg transition-all duration-150 active:scale-95"
        >
          🗑️ Vaciar carrito
        </button>
      )}
    </div>
  );

  return (
    <Modal titulo="🛒 Mi carrito" cerrar={cerrar} pie={pie}>
      {vacio ? (
        <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-16">
          <span className="text-5xl">🕹️</span>

          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Tu carrito está vacío.
            <br />
            Elegí algún juego del catálogo y lo vas a ver acá.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {carrito.map((item) => (
            <CarritoItem key={item.id} item={item} />
          ))}
        </ul>
      )}
    </Modal>
  );
}

export default CarritoModal;