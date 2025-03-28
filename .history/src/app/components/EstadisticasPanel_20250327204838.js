import React from "react";

export default function EstadisticasPanel({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <p className="text-sm text-gray-500">Viajes realizados</p>
        <p className="text-2xl font-bold text-blue-600">{stats.cantidadViajes}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <p className="text-sm text-gray-500">Pasajeros (acum.)</p>
        <p className="text-2xl font-bold text-green-600">{stats.cantidadPasajeros}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <p className="text-sm text-black">Recaudación mensual</p>
        <p className="text-2xl font-bold text-yellow-600">${stats.recaudacionMensual}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <p className="text-sm text-black">Recaudación anual</p>
        <p className="text-2xl font-bold text-purple-600">${stats.recaudacionAnual}</p>
      </div>
    </div>
  );
}
