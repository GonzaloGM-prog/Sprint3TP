function Campo({ id, etiqueta, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {etiqueta}
      </label>

      {children}

      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default Campo;