function Modal({ titulo, cerrar, children, pie }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Cerrar"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={cerrar}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        className="relative z-10 flex flex-col w-full max-w-sm h-full bg-white dark:bg-slate-900 border-l border-violet-500/30 shadow-2xl shadow-violet-900/40 overflow-y-auto"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700/60 sticky top-0 bg-white dark:bg-slate-900 z-10">
          <h2 id="modal-titulo" className="text-lg font-bold text-slate-900 dark:text-white">{titulo}</h2>

          <button
            type="button"
            aria-label="Cerrar"
            onClick={cerrar}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all duration-150 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 px-5 py-4">{children}</div>

        {pie && (
          <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700/60 sticky bottom-0 bg-white dark:bg-slate-900">
            {pie}
          </div>
        )}
      </aside>
    </div>
  );
}

export default Modal;
