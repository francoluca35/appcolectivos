'use client';
import { useState } from "react";
import useAgregarViaje from "@/hooks/useAgregarViaje";

export default function AgregarViajeForm() {
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
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
      {[
        { label: "Origen", name: "origen", type: "text" },
        { label: "Destino", name: "destino", type: "text" },
        { label: "Localidad", name: "localidad", type: "text" },
        { label: "Fecha desde", name: "fechaDesde", type: "date" },
        { label: "Fecha hasta", name: "fechaHasta", type: "date" },
        { label: "Hora salida", name: "horaSalida", type: "time" },
        { label: "Hora llegada", name: "horaLlegada", type: "time" },
      ].map((input, i) => (
        <div key={i}>
          <label className="block mb-1">{input.label}</label>
          <input
            type={input.type}
            name={input.name}
            value={form[input.name]}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 text-black"
          />
        </div>
      ))}

      {/* Horario */}
      <div>
        <label className="block mb-1">Horario (turno)</label>
        <select name="horario" value={form.horario} onChange={handleChange} className="w-full p-2 rounded bg-gray-100 text-black">
          <option value="">Seleccionar</option>
          <option value="mañana">Mañana</option>
          <option value="tarde">Tarde</option>
          <option value="noche">Noche</option>
        </select>
      </div>

      {/* Tipo de servicio */}
      <div>
        <label className="block mb-1">Tipo de servicio</label>
        <select name="tipoServicio" value={form.tipoServicio} onChange={handleChange} className="w-full p-2 rounded bg-gray-100 text-black">
          <option value="">Seleccionar</option>
          <option value="semi-cama">Semi Cama</option>
          <option value="cama-completa">Cama Completa</option>
          <option value="clasico">Clásico</option>
        </select>
      </div>

      {/* Precio */}
      <div>
        <label className="block mb-1">Precio</label>
        <input
          type="number"
          name="precio"
          placeholder="$"
          value={form.precio}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-100 text-black"
        />
      </div>

      {/* Botón */}
      <div className="md:col-span-2 text-center mt-4">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white transition" disabled={loading}>
          {loading ? "Guardando..." : "Guardar viaje"}
        </button>
        {error && <p className="text-red-400 mt-2">{error}</p>}
        {success && <p className="text-green-400 mt-2">Viaje guardado correctamente</p>}
      </div>
    </form>
  );
}
