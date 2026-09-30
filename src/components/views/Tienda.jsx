import { useState } from "react";
import productos from "../../data/productos";
import SearchBar from "../SearchBar";
import ProductoList from "../ProductoList";

function Tienda() {
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = productos.filter((producto) =>
    producto.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <section aria-label="Presentación" className="text-center flex flex-col gap-2">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Tu tienda de{" "}
          <span className="text-violet-600 dark:text-violet-400">videojuegos</span>
        </h2>

        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Explorá el catálogo, sumá juegos a tu carrito y armá tu compra.
        </p>
      </section>

      <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />

      <section aria-label="Catálogo de videojuegos">
        {productosFiltrados.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <span className="text-5xl">🔍</span>

            <p className="text-slate-500 dark:text-slate-400">
              No encontramos nada para{" "}
              <span className="text-violet-600 dark:text-violet-400 font-semibold">
                "{busqueda}"
              </span>
            </p>
          </div>
        ) : (
          <ProductoList productos={productosFiltrados} />
        )}
      </section>
    </>
  );
}

export default Tienda;
