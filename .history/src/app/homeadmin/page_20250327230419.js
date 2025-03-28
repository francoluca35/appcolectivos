"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EstadisticasPanel from "../components/EstadisticasPanel";

export default function HomeAdmin() {
  const [fechaHora, setFechaHora] = useState(new Date());
  const router = useRouter();

  const usuario = JSON.parse(localStorage.getItem("adminUser")) || {
    username: "Admin",
    role: "admin",
  };
  const stats = {
    cantidadViajes: 42,
    cantidadPasajeros: 315,
    recaudacionMensual: 45600,
    recaudacionAnual: 512000,
  };

  useEffect(() => {
    const interval = setInterval(() => setFechaHora(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const botones = [
    { texto: "Agregar viaje", ruta: "/agregarviaje" },
    { texto: "Lista de viajes", ruta: "/listaviajes" },
    { texto: "Check de pagos", ruta: "/checkpagos" },
    { texto: "Bandeja de mensajes", ruta: "/mensajes" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        {/* Fecha y hora */}
        <div className="text-gray-700 font-medium">
          <p>{fechaHora.toLocaleDateString()}</p>
          <p>{fechaHora.toLocaleTimeString()}</p>
        </div>

        {/* Usuario */}
        <div className="flex items-center gap-3">
          <img
            src="/avatar.png"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-gray-300"
          />
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800">{usuario.username}</p>
            <p className="text-xs text-blue-600 uppercase">{usuario.role}</p>
          </div>
        </div>
      </div>
      <EstadisticasPanel stats={stats} />

      {/* Cuadrícula de botones */}
      <div className="flex-grow flex justify-center items-center relative">
  {/* Cuadrícula de botones */}
  <div className="grid grid-cols-2 gap-6">
    {botones.map((btn, i) => (
      <button
        key={i}
        onClick={() => router.push(btn.ruta)}
        className="w-40 h-40 bg-blue-600 text-white font-semibold text-center rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        {btn.texto}
      </button>
    ))}
  </div>

  {/* Botón de logout al centro */}
  <button
    onClick={() => {
      localStorage.removeItem("adminUser");
      router.push("/admin");
    }}
    className="absolute bg-red-600 text-white p-2 rounded-xl hover:bg-red-700 transition top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
    title="Cerrar sesión"
  >
    ⏻
  </button>
</div>
    </div>
  );
}
