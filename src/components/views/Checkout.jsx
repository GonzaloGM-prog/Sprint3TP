import { useForm } from "react-hook-form";
import { useCarritoContext } from "../../context/CarritoContext";
import { ENVIO } from "../../data/envios";
import Campo from "../ui/Campo";
import ResumenPedido from "../ResumenPedido";

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_SOLO_NUMEROS = /^\d+$/;
const MAX_NOTAS = 200;

const CLASE_INPUT =
  "w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 aria-[invalid=true]:border-red-500 transition-all";

function Checkout({ volver, confirmar }) {
  const { carrito, total, vaciar } = useCarritoContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      metodoEnvio: ENVIO.DOMICILIO,
      direccion: "",
      notas: "",
      terminos: false,
    },
  });

  const metodoEnvio = watch("metodoEnvio");
  const notas = watch("notas");
  const esDomicilio = metodoEnvio === ENVIO.DOMICILIO;

  const alConfirmar = (datos) => {
    const pedido = {
      nombre: datos.nombre.trim(),
      email: datos.email.trim(),
      telefono: datos.telefono,
      metodoEnvio: datos.metodoEnvio,
      direccion: datos.metodoEnvio === ENVIO.DOMICILIO ? datos.direccion.trim() : null,
      notas: datos.notas.trim(),
      items: carrito.map((item) => ({
        id: item.id,
        nombre: item.name,
        precio: item.price,
        cantidad: item.cantidad,
        subtotal: item.price * item.cantidad,
      })),
      total,
    };

    console.log(pedido);
    vaciar();
    confirmar(pedido);
  };

  const propsError = (campo) => ({
    "aria-invalid": errors[campo] ? "true" : "false",
    "aria-describedby": errors[campo] ? `${campo}-error` : undefined,
  });

  return (
    <section aria-label="Checkout" className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight">Finalizá tu compra</h2>

        <button
          type="button"
          onClick={volver}
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95"
        >
          ← Volver a la tienda
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <form
          noValidate
          onSubmit={handleSubmit(alConfirmar)}
          className="flex flex-col gap-4 p-5 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl"
        >
          <Campo id="nombre" etiqueta="Nombre completo" error={errors.nombre?.message}>
            <input
              id="nombre"
              type="text"
              autoComplete="name"
              className={CLASE_INPUT}
              {...propsError("nombre")}
              {...register("nombre", {
                required: "Ingresá tu nombre completo.",
                minLength: { value: 3, message: "El nombre tiene que tener al menos 3 caracteres." },
              })}
            />
          </Campo>

          <Campo id="email" etiqueta="Email" error={errors.email?.message}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={CLASE_INPUT}
              {...propsError("email")}
              {...register("email", {
                required: "Ingresá tu email.",
                pattern: { value: REGEX_EMAIL, message: "Ese email no parece válido. Ejemplo: nombre@correo.com" },
              })}
            />
          </Campo>

          <Campo id="telefono" etiqueta="Teléfono" error={errors.telefono?.message}>
            <input
              id="telefono"
              type="text"
              inputMode="numeric"
              autoComplete="tel"
              className={CLASE_INPUT}
              {...propsError("telefono")}
              {...register("telefono", {
                required: "Ingresá tu teléfono.",
                pattern: { value: REGEX_SOLO_NUMEROS, message: "Usá solo números, sin espacios ni guiones." },
                minLength: { value: 8, message: "El teléfono tiene que tener al menos 8 números." },
              })}
            />
          </Campo>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Método de envío
            </legend>

            <div className="flex items-center gap-2">
              <input
                id="envio-domicilio"
                type="radio"
                value={ENVIO.DOMICILIO}
                className="accent-violet-600"
                {...register("metodoEnvio", { required: "Elegí un método de envío." })}
              />
              <label htmlFor="envio-domicilio" className="text-sm">
                Envío a domicilio
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="envio-retiro"
                type="radio"
                value={ENVIO.RETIRO}
                className="accent-violet-600"
                {...register("metodoEnvio", { required: "Elegí un método de envío." })}
              />
              <label htmlFor="envio-retiro" className="text-sm">
                Retiro en el local
              </label>
            </div>

            {errors.metodoEnvio && (
              <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                {errors.metodoEnvio.message}
              </p>
            )}
          </fieldset>

          {esDomicilio && (
            <Campo id="direccion" etiqueta="Dirección de entrega" error={errors.direccion?.message}>
              <input
                id="direccion"
                type="text"
                autoComplete="street-address"
                className={CLASE_INPUT}
                {...propsError("direccion")}
                {...register("direccion", {
                  required: "Ingresá la dirección donde querés recibir tu pedido.",
                })}
              />
            </Campo>
          )}

          <Campo id="notas" etiqueta="Notas (opcional)" error={errors.notas?.message}>
            <textarea
              id="notas"
              rows={3}
              className={CLASE_INPUT}
              {...propsError("notas")}
              {...register("notas", {
                maxLength: { value: MAX_NOTAS, message: `Las notas pueden tener hasta ${MAX_NOTAS} caracteres.` },
              })}
            />
            <span className="text-xs text-slate-500 dark:text-slate-400 self-end">
              {notas.length}/{MAX_NOTAS}
            </span>
          </Campo>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <input
                id="terminos"
                type="checkbox"
                className="accent-violet-600"
                {...propsError("terminos")}
                {...register("terminos", { required: "Tenés que aceptar los términos para continuar." })}
              />
              <label htmlFor="terminos" className="text-sm">
                Acepto los términos y condiciones
              </label>
            </div>

            {errors.terminos && (
              <p id="terminos-error" role="alert" className="text-sm text-red-600 dark:text-red-400">
                {errors.terminos.message}
              </p>
            )}
          </div>

        <button
            type="submit"
            disabled={carrito.length === 0}
            className="w-full px-4 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
          >
            Confirmar pedido
          </button>
        </form>

        <ResumenPedido />
      </div>
    </section>
  );
}

export default Checkout;