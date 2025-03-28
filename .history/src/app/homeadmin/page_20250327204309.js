"use client";

import React, { useEffect, useState } from "react";

export default function HomeAdmin() {
  const [fechaHora, setFechaHora] = useState(new Date());
  const usuario = JSON.parse(localStorage.getItem("adminUser")) || { username: "Admin", role: "admin" };

  useEffect(() => {
    const interval = setInterval(() => setFechaHora(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
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

      {/* Botones */}
      <div className="flex flex-col items-center justify-center flex-grow gap-6">
        <button className="w-64 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Agregar viaje</button>
        <button className="w-64 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Lista de viajes</button>
        <button className="w-64 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Check de pagos</button>
        <button className="w-64 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Bandeja de mensajes</button>
      </div>
    </div>
  );
}
