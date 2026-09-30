import { useCarritoContext } from "../context/CarritoContext";
import { formatearPrecio } from "../utils/formato";

const CLASE_BOTON_CANTIDAD =
  "w-7 h-7 flex items-center justify-center rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-bold transition-all duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100";

function CarritoItem({ item }) {
  const { cambiarCantidad, quitar } = useCarritoContext();

  return (
    <li className="flex flex-col gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-xl hover:border-violet-500/40 transition-all duration-150">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-slate-900 dark:text-white text-sm font-semibold truncate">
            {item.name}
          </h3>

          <p className="text-slate-500 dark:text-slate-400 text-xs">
            {formatearPrecio(item.price)} c/u
          </p>
        </div>

        <button
          type="button"
          onClick={() => quitar(item.id)}
          className="shrink-0 px-3 py-1 bg-red-500/10 border border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-500/20 text-xs font-semibold rounded-lg transition-all duration-150 active:scale-95"
        >
          Quitar
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Restar una unidad de ${item.name}`}
            onClick={() => cambiarCantidad(item.id, -1)}
            className={CLASE_BOTON_CANTIDAD}
          >
            −
          </button>

          <span className="w-6 text-center text-sm font-semibold text-slate-900 dark:text-white">
            {item.cantidad}
          </span>

          <button
            type="button"
            aria-label={`Sumar una unidad de ${item.name}`}
            onClick={() => cambiarCantidad(item.id, 1)}
            disabled={item.cantidad >= item.stock}
            className={CLASE_BOTON_CANTIDAD}
          >
            +
          </button>
        </div>

        <p className="text-sm font-bold text-slate-900 dark:text-white">
          {formatearPrecio(item.price * item.cantidad)}
        </p>
      </div>
    </li>
  );
}

export default CarritoItem;

