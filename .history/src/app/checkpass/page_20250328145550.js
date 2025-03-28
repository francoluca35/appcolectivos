'use client';
import React from 'react';
import useCheckPass from '@/hooks/useCheckPass';
import { UserIcon } from 'lucide-react';

function CheckPass() {
  const { pasajeros, loading } = useCheckPass();

  if (loading) return <p className="text-center text-gray-500 mt-10">Cargando pasajeros...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Pasajeros con boleto</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pasajeros.map((item, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <UserIcon size={20} /> {item.nombreCompleto || "Nombre no disponible"}
            </div>
            <p><strong>Email:</strong> {item.correo}</p>
            <p><strong>Destino:</strong> {item.destino}</p>
            <p><strong>Fecha:</strong> {item.fechaViaje}</p>
            <p><strong>Cantidad:</strong> {item.cantidad}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckPass;
