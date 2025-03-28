"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EstadisticasPanel from "../components/EstadisticasPanel";

export default function HomeAdmin() {
  const [fechaHora, setFechaHora] = useState(new Date());
  const router = useRouter();

  const usuario = JSON.parse(localStorage.getItem("adminUser")) || {
    username: "Admin",
    role: "COORDINADOR",
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
    { texto: "Agregar viaje", ruta: "/agregarviaje", icono: "/iconos/agregar.png" },
    { texto: "Lista de viajes", ruta: "/listaviajes", icono: "/iconos/lista.png" },
    { texto: "Check de pagos", ruta: "/checkpagos", icono: "/iconos/check.png" },
    { texto: "Bandeja de mensajes", ruta: "/mensajes", icono: "/iconos/mensajes.png" },
    { texto: "Dashboard", ruta: "/dashboard", icono: "/iconos/dashboard.png" },
  ];

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center gap-6">
      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">{fechaHora.toLocaleDateString()}</p>
          <p className="text-xs text-gray-500">{fechaHora.toLocaleTimeString()}</p>
        </div>

        <div className="flex items-center gap-3">
          <img src="/avatar.png" alt="Avatar" className="w-10 h-10 rounded-full border" />
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800">{usuario.username}</p>
            <p className="text-xs text-red-500 uppercase">{usuario.role}</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("adminUser");
              router.push("/admin");
            }}
            className="text-red-500 text-xl hover:text-red-700 transition"
            title="Cerrar sesión"
          >
            ⏻
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="w-full">
        <EstadisticasPanel stats={stats} />
      </div>

      {/* Botones */}
   {/* Botones */}
<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-2 w-full justify-items-center">
  {botones.map((btn, i) => (
    <button
      key={i}
      onClick={() => router.push(btn.ruta)}
      className="bg-red-500 rounded-xl w-36 h-36 md:w-28 md:h-28 flex flex-col items-center justify-center shadow-md hover:bg-red-600 transition"
    >
      <img src={btn.icono} alt={btn.texto} className="w-8 h-8 md:w-6 md:h-6 mb-2" />
      <span className="text-white text-sm font-semibold text-center px-1 leading-tight">
        {btn.texto}
      </span>
    </button>
  ))}
</div>

    </div>
  );
}
