'use client';
import React, { useState } from 'react';
import useCheckPass from '@/hooks/useCheckPass';

export default function CheckPass() {
  const { pasajeros, loading } = useCheckPass();
  const [selected, setSelected] = useState(null);

  if (loading) return <p className="text-center text-gray-500 mt-10">Cargando pasajeros...</p>;

  // Agrupar pasajeros por destino
  const agrupados = pasajeros.reduce((acc, pasajero) => {
    const destino = pasajero.destino || "Sin destino";
    if (!acc[destino]) acc[destino] = [];
    acc[destino].push(pasajero);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">Check de Pasajes</h1>

      {/* Agrupados por destino */}
      {Object.entries(agrupados).map(([destino, grupo]) => (
        <div key={destino} className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-blue-700">{destino}</h2>
          <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
            {grupo.map((p) => (
              <li
                key={p.id}
                onClick={() => setSelected(p)}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between text-black"
              >
                <span><strong>{p.nombreCompleto}</strong>, {new Date(p.fechaViaje).toLocaleDateString("es-AR")}</span>

                <span>DNI: {p.dni}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg animate-fadeIn">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Detalles del Pasajero</h3>
            <div className="space-y-2 text-gray-700 text-sm">
              {Object.entries(selected).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {String(value)}</p>
              ))}
            </div>
            <div className="text-center mt-6">
              <button
                onClick={() => setSelected(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
