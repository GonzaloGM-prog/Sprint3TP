function SearchBar({ busqueda, setBusqueda }) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">
        🔍
      </span>

      <label htmlFor="buscar-videojuego" className="sr-only">
        Buscar videojuego
      </label>

      <input
        id="buscar-videojuego"
        type="text"
        placeholder="Buscar videojuego..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full px-12 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
      />
    </div>
  );
}

export default SearchBar;
