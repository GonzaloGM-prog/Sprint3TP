import { ENVIO } from "../../data/envios";
import { formatearPrecio } from "../../utils/formato";

function Confirmacion({ pedido, volver }) {
  const esDomicilio = pedido.metodoEnvio === ENVIO.DOMICILIO;

  return (
    <section
      aria-label="Confirmación del pedido"
      className="flex flex-col items-center gap-4 py-16 text-center"
    >
      <span className="text-6xl">🎉</span>

      <h2 className="text-3xl font-extrabold tracking-tight">
        ¡Gracias por tu compra, {pedido.nombre}!
      </h2>

      <p className="text-slate-500 dark:text-slate-400 max-w-md">
        Te mandamos el detalle a{" "}
        <span className="font-semibold text-slate-900 dark:text-white">{pedido.email}</span>.{" "}
        {esDomicilio
          ? `Lo enviamos a ${pedido.direccion}.`
          : "Lo podés retirar en el local."}
      </p>

      <p className="text-lg">
        Total del pedido:{" "}
        <span className="font-extrabold">{formatearPrecio(pedido.total)}</span>
      </p>

      <button
        type="button"
        onClick={volver}
        className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all duration-200 active:scale-95"
      >
        Volver a la tienda
      </button>
    </section>
  );
}

export default Confirmacion;