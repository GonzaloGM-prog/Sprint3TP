import { useCarritoContext } from "../context/CarritoContext";
import { formatearPrecio } from "../utils/formato";

function ProductoCard({ producto }) {
  const { cantidadDe, agregar } = useCarritoContext();

  const enCarrito = cantidadDe(producto.id);
  const agotado = producto.stock === 0;
  const alMaximo = enCarrito >= producto.stock;

  let textoBoton = "+ Agregar";
  if (agotado) textoBoton = "Sin stock";
  else if (alMaximo) textoBoton = "Ya tenés todo el stock";
  else if (enCarrito > 0) textoBoton = "+ Agregar otro";

  return (
    <article className="relative flex flex-col gap-3 p-5 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-violet-500/60 rounded-2xl backdrop-blur-sm transition-all duration-200 hover:shadow-xl hover:shadow-violet-900/30 hover:-translate-y-1 group">
      {producto.featured && (
        <span className="absolute top-3 right-3 px-2 py-0.5 bg-amber-400/20 border border-amber-400/40 text-amber-600 dark:text-amber-300 text-xs font-bold rounded-full">
          🔥 DESTACADO
        </span>
      )}

      <h2 className="text-slate-900 dark:text-white font-bold text-base leading-snug pr-20 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
        {producto.name}
      </h2>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2 py-0.5 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-xs rounded-lg">
          {producto.category}
        </span>
        <span className="px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400 text-xs rounded-lg">
          {producto.year}
        </span>
      </div>

      <p className="text-green-600 dark:text-green-400 font-semibold text-sm">⭐ {producto.score}</p>

      <p className="text-slate-900 dark:text-white font-bold text-lg">
        {formatearPrecio(producto.price)}
      </p>

      <p className={`text-xs ${agotado ? "text-red-600 dark:text-red-400 font-semibold" : "text-slate-500 dark:text-slate-400"}`}>
        {agotado ? "Agotado" : `Stock: ${producto.stock}`}
        {enCarrito > 0 && ` · En tu carrito: ${enCarrito}`}
      </p>

      <button
        type="button"
        onClick={() => agregar(producto.id)}
        disabled={agotado || alMaximo}
        className={`mt-auto w-full py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 ${
          enCarrito > 0
            ? "bg-green-500/20 border border-green-500/50 text-green-700 dark:text-green-400 hover:bg-green-500/30"
            : "bg-violet-600/80 border border-violet-500/50 text-white hover:bg-violet-500"
        }`}
      >
        {textoBoton}
      </button>
    </article>
  );
}

export default ProductoCard;
