import { useCarritoContext } from "../../context/CarritoContext";
import { useThemeContext } from "../../context/ThemeContext";

function Navbar({ abrirCarrito }) {
  const { cantidadTotal } = useCarritoContext();
  const { esOscuro, alternarTema } = useThemeContext();

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-violet-500/30 shadow-lg shadow-violet-900/20">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
        🎮 <span className="text-violet-600 dark:text-violet-400">Tienda</span> de videojuegos
      </h1>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={alternarTema}
          aria-label={esOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-200 active:scale-95"
        >
          {esOscuro ? "☀️" : "🌙"}
        </button>

        <button
          type="button"
          onClick={abrirCarrito}
          className="relative flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg active:scale-95"
        >
          🛒 Carrito
          {cantidadTotal > 0 && (
            <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-5 h-5 px-1 bg-green-400 text-slate-900 text-xs font-bold rounded-full shadow-md">
              {cantidadTotal}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;