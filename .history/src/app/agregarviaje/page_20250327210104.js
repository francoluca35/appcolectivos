"use client";
import { useState } from "react";
import useAgregarViaje from "@/hooks/useAgregarViaje";

function AgregarViaje() {
  const [form, setForm] = useState({
    origen: "",
    destino: "",
    localidad: "",
    fechaDesde: "",
    fechaHasta: "",
    horaSalida: "",
    horaLlegada: "",
    horario: "",
    precio: "",
    tipoServicio: "",
  });

  const { agregarViaje, loading, error, success } = useAgregarViaje();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await agregarViaje(form);
    setForm({
      origen: "",
      destino: "",
      localidad: "",
      fechaDesde: "",
      fechaHasta: "",
      horaSalida: "",
      horaLlegada: "",
      horario: "",
      precio: "",
      tipoServicio: "",
    });
  };

  return (
    <div className="min-h-screen bg-blue-800 flex justify-center items-center p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Agregar nuevo viaje</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div>
            <label className="block mb-1 font-medium">Origen</label>
            <input type="text" name="origen" className="border p-2 rounded w-full" value={form.origen} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1 font-medium">Destino</label>
            <input type="text" name="destino" className="border p-2 rounded w-full" value={form.destino} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1 font-medium">Localidad</label>
            <input type="text" name="localidad" className="border p-2 rounded w-full" value={form.localidad} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Fecha desde</label>
              <input type="date" name="fechaDesde" className="border p-2 rounded w-full" value={form.fechaDesde} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Fecha hasta</label>
              <input type="date" name="fechaHasta" className="border p-2 rounded w-full" value={form.fechaHasta} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Hora de salida</label>
              <input type="time" name="horaSalida" className="border p-2 rounded w-full" value={form.horaSalida} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Hora de llegada</label>
              <input type="time" name="horaLlegada" className="border p-2 rounded w-full" value={form.horaLlegada} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Horario (turno del día)</label>
            <select name="horario" className="border p-2 rounded w-full" value={form.horario} onChange={handleChange}>
              <option value="">Seleccionar horario</option>
              <option value="mañana">Mañana</option>
              <option value="tarde">Tarde</option>
              <option value="noche">Noche</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Tipo de servicio</label>
            <select name="tipoServicio" className="border p-2 rounded w-full" value={form.tipoServicio} onChange={handleChange}>
              <option value="">Seleccionar tipo</option>
              <option value="semi-cama">Semi Cama</option>
              <option value="cama-completa">Cama Completa</option>
              <option value="clasico">Clásico</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Precio</label>
            <input type="number" name="precio" className="border p-2 rounded w-full" placeholder="Precio en pesos" value={form.precio} onChange={handleChange} />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar viaje"}
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">Viaje guardado correctamente</p>}
        </form>
      </div>
    </div>
  );
}

export default AgregarViaje;
