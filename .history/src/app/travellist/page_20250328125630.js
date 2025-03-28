'use client';
import React, { useState } from 'react';
import useVerViajes from '@/hooks/useVerViajes';
import { Trash2 } from 'lucide-react'; // O usa cualquier ícono

export default function ListaViajes() {
  const { viajes, loading, eliminarViaje } = useVerViajes();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const abrirModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmarEliminacion = () => {
    eliminarViaje(selectedId);
    setShowModal(false);
    setSelectedId(null);
  };

  const cancelarEliminacion = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  if (loading) return <p className="text-center mt-10 text-gray-500 text-lg">Cargando viajes...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Lista de Viajes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {viajes.map((viaje) => (
          <div
            key={viaje._id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {viaje.origen} → {viaje.destino}
              </h2>
              <p className="text-sm text-gray-500">{viaje.localidad}</p>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Desde:</strong> {viaje.fechaDesde}</p>
              <p><strong>Hasta:</strong> {viaje.fechaHasta}</p>
              <p><strong>Salida:</strong> {viaje.horaSalida}</p>
              <p><strong>Llegada:</strong> {viaje.horaLlegada}</p>
              <p><strong>Turno:</strong> {viaje.horario}</p>
              <p><strong>Servicio:</strong> {viaje.tipoServicio}</p>
              <p><strong>Precio:</strong> ${viaje.precio}</p>
            </div>

            <button
              onClick={() => abrirModal(viaje._id)}
              className="flex items-center justify-center gap-2 mt-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all w-full"
            >
              <Trash2 size={18} /> Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm animate-fadeIn">
            <h3 className="text-xl font-semibold mb-3 text-center">¿Eliminar viaje?</h3>
            <p className="text-center text-gray-600 mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelarEliminacion}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminacion}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
