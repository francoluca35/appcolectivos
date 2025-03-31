'use client';
import React, { useEffect, useRef, useState } from 'react';
import useCheckPass from '@/hooks/useCheckPass';
import PdfDownloadButton from './PdfDownloadButton';
import PdfAllDownload from './PdfAllDownload';

export default function PasajerosLista() {
  const { pasajeros, loading } = useCheckPass();
  const [selected, setSelected] = useState(null);
  const [verMas, setVerMas] = useState({});
  const refs = useRef({}); // refs por destino

  if (loading) return <p className="text-center text-gray-500 mt-10">Cargando pasajeros...</p>;

  const agrupados = pasajeros.reduce((acc, pasajero) => {
    const destino = pasajero.destino || "Sin destino";
    if (!acc[destino]) acc[destino] = [];
    acc[destino].push(pasajero);
    return acc;
  }, {});

  const toggleVerMas = (destino) => {
    setVerMas((prev) => ({ ...prev, [destino]: !prev[destino] }));
    setTimeout(() => {
      refs.current[destino]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <>
      {Object.entries(agrupados).map(([destino, grupo]) => (
        <div key={destino} className="mb-10" ref={(el) => (refs.current[destino] = el)}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-blue-700">{destino}</h2>
            <PdfAllDownload data={{ [destino]: grupo }} />
          </div>

          <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
            {(verMas[destino] ? grupo : grupo.slice(0, 3)).map((p) => (
              <li
                key={p._id}
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

          {grupo.length > 3 && (
            <div className="text-center mt-2">
              <button
                onClick={() => toggleVerMas(destino)}
                className="text-sm text-blue-600 hover:underline"
              >
                {verMas[destino] ? 'Ver menos' : `Ver más (${grupo.length - 3} más)`}
              </button>
            </div>
          )}
        </div>
      ))}

      {selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg animate-fadeIn">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Detalles del Pasajero</h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <p><strong>Nombre:</strong> {selected.nombreCompleto}</p>
              <p><strong>DNI:</strong> {selected.dni}</p>
              <p><strong>Teléfono:</strong> {selected.telefono}</p>
              <p><strong>Correo:</strong> {selected.correo}</p>
              <p><strong>Dirección:</strong> {selected.direccion}</p>
              <p><strong>Localidad:</strong> {selected.localidad}</p>
              <p><strong>Fecha del viaje:</strong> {new Date(selected.fechaViaje).toLocaleDateString("es-AR")}</p>
              <p><strong>Desde:</strong> {selected.origen}</p>
              <p><strong>Hasta:</strong> {selected.destino}</p>
              <p><strong>Horario salida:</strong> {selected.horariosalida}</p>
              <p><strong>Horario llegada:</strong> {selected.horariollegada}</p>
              <p><strong>Butaca:</strong> {selected.butaca}</p>
              <p><strong>Cantidad de pasajes:</strong> {selected.cantidad}</p>
              <p><strong>Total:</strong> ${selected.total}</p>
              <p><strong>Método de pago:</strong> {selected.metodoPago}</p>

              {Array.isArray(selected.pasajerosExtras) && selected.pasajerosExtras.length > 0 && (
                <>
                  <hr className="my-2" />
                  <h4 className="font-bold text-gray-800">Acompañantes:</h4>
                  {selected.pasajerosExtras.map((extra, idx) => (
                    <div key={idx} className="pl-2 border-l-4 border-blue-500 mb-2">
                      <p><strong>Pasajero {idx + 2}</strong></p>
                      <p>Nombre: {extra.nombre}</p>
                      <p>DNI: {extra.dni}</p>
                    </div>
                  ))}
                </>
              )}
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