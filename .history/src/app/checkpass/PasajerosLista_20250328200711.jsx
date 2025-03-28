
'use client';
import React, { useState } from 'react';
import useCheckPass from '@/hooks/useCheckPass';
import PdfDownloadButton from './PdfDownloadButton';
import PdfAllDownload from './PdfAllDownload';

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

  <div className="flex items-center justify-between mb-2">
    <h2 className="text-xl font-bold text-blue-700">{destino}</h2>
    <PdfAllDownload data={{ [destino]: grupo }} />
  </div>
          <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
            {grupo.map((p) => (
              <li
                key={p.id}
                className="px-4 py-3 flex justify-between items-center text-black"
              >
                
                <div>
                  <p className="font-semibold">{p.nombreCompleto}</p>
                  <p className="text-sm text-gray-600">DNI: {p.dni}</p>
                  <p className="text-sm text-gray-600">
                    Fecha viaje: {new Date(p.fechaViaje).toLocaleDateString("es-AR")}
                  </p>
                </div>

                
                <div className="flex gap-2">
  <button
    onClick={() => setSelected(p)}
    className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded hover:bg-gray-300 transition"
  >
    Ver más detalles
  </button>
  <PdfDownloadButton pasajero={p} />
</div>

              </li>
            ))}
          </ul>
        </div>
      ))}

     
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
