"use client";
import { useState } from "react";
import useAgregarViaje from "@/hooks/useAgregarViaje";
import BackArrow from "../components/backArrow";

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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <BackArrow />
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Agregar nuevo viaje</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">

          <div>
            <label className="block mb-1">Origen</label>
            <input type="text" name="origen" className="w-full p-2 rounded bg-gray-100 text-black" value={form.origen} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1">Destino</label>
            <input type="text" name="destino" className="w-full p-2 rounded bg-gray-100 text-black" value={form.destino} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1">Localidad</label>
            <input type="text" name="localidad" className="w-full p-2 rounded bg-gray-100 text-black" value={form.localidad} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1">Fecha desde</label>
            <input type="date" name="fechaDesde" className="w-full p-2 rounded bg-gray-100 text-black" value={form.fechaDesde} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1">Fecha hasta</label>
            <input type="date" name="fechaHasta" className="w-full p-2 rounded bg-gray-100 text-black" value={form.fechaHasta} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1">Hora salida</label>
            <input type="time" name="horaSalida" className="w-full p-2 rounded bg-gray-100 text-black" value={form.horaSalida} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1">Hora llegada</label>
            <input type="time" name="horaLlegada" className="w-full p-2 rounded bg-gray-100 text-black" value={form.horaLlegada} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1">Horario (turno)</label>
            <select name="horario" className="w-full p-2 rounded bg-gray-100 text-black" value={form.horario} onChange={handleChange}>
              <option value="">Seleccionar</option>
              <option value="mañana">Mañana</option>
              <option value="tarde">Tarde</option>
              <option value="noche">Noche</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Tipo de servicio</label>
            <select name="tipoServicio" className="w-full p-2 rounded bg-gray-100 text-black" value={form.tipoServicio} onChange={handleChange}>
              <option value="">Seleccionar</option>
              <option value="semi-cama">Semi Cama</option>
              <option value="cama-completa">Cama Completa</option>
              <option value="clasico">Clásico</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Precio</label>
            <input type="number" name="precio" className="w-full p-2 rounded bg-gray-100 text-black" placeholder="$" value={form.precio} onChange={handleChange} />
          </div>

          <div className="md:col-span-2 text-center mt-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white transition" disabled={loading}>
              {loading ? "Guardando..." : "Guardar viaje"}
            </button>
            {error && <p className="text-red-400 mt-2">{error}</p>}
            {success && <p className="text-green-400 mt-2">Viaje guardado correctamente</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgregarViaje;
