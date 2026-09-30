import { useCarritoContext } from "../context/CarritoContext";
import { formatearPrecio } from "../utils/formato";

function ResumenPedido() {
  const { carrito, total } = useCarritoContext();

  return (
    <section
      aria-label="Resumen del pedido"
      className="flex flex-col gap-4 p-5 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl"
    >
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Resumen del pedido</h2>

      <ul className="flex flex-col gap-3">
        {carrito.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-slate-700 dark:text-slate-300">
              {item.name} <span className="text-slate-500">× {item.cantidad}</span>
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {formatearPrecio(item.price * item.cantidad)}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700/60">
        <span className="font-semibold text-slate-700 dark:text-slate-300">Total</span>
        <span className="text-xl font-extrabold text-slate-900 dark:text-white">
          {formatearPrecio(total)}
        </span>
      </div>
    </section>
  );
}

export default ResumenPedido;
