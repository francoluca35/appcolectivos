'use client';
import { useState, useEffect } from "react";
import useEnviarMensaje from "@/hooks/useEnviarMensajes";
import { Send } from "lucide-react";

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nombre: "", correo: "", mensaje: "" });
  const { enviarMensaje, loading, success, error } = useEnviarMensaje();
  const [disponible, setDisponible] = useState(false);

  // Mostrar chat solo entre 00:00 y 22:00
  useEffect(() => {
    const hora = new Date().getHours();
    if (hora >= 0 && hora < 22) setDisponible(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await enviarMensaje(form);
    setForm({ nombre: "", correo: "", mensaje: "" });
  };

  if (!disponible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white p-3 rounded-full shadow hover:bg-blue-700"
      >
        💬
      </button>

      {open && (
        <div className="bg-white p-4 rounded-lg shadow-xl w-80 mt-2">
          <h3 className="text-lg font-semibold mb-2">¿En qué podemos ayudarte?</h3>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              placeholder="Tu correo"
              required
              className="w-full border p-2 rounded"
            />
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              placeholder="Escribí tu mensaje"
              required
              className="w-full border p-2 rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              {loading ? "Enviando..." : <><Send size={16} /> Enviar</>}
            </button>
          </form>

          {success && <p className="text-green-600 text-sm mt-2">✅ Mensaje enviado</p>}
          {error && <p className="text-red-600 text-sm mt-2">❌ {error}</p>}
        </div>
      )}
    </div>
  );
}
