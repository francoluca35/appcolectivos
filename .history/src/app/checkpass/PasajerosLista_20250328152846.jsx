// components/PasajerosLista.jsx
'use client';
import React, { useState } from 'react';
import useCheckPass from '@/hooks/useCheckPass';
import PdfDownloadButton from './PdfDownloadButton';

export default function PasajerosLista() {
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
    <>
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
               
                <span><strong>{p.nombreCompleto}</strong>,<strong>{p.dni}</strong>, {new Date(p.fechaViaje).toLocaleDateString("es-AR")}</span>
                
                 <PdfDownloadButton/>
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
    </>
  );
}
