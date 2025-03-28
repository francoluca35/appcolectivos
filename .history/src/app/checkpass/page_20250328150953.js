'use client';
import React, { Suspense } from 'react';
import PasajerosLista from './PasajerosLista';
import BackArrow from '../components/backArrow';

export default function CheckPass() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="relative flex items-center justify-center mb-8">
  {/* Flecha a la izquierda con posición absoluta */}
  <div className="absolute left-0">
    <BackArrow />
  </div>

  {/* Título centrado perfectamente */}
  <h1 className="text-3xl font-bold text-black text-center">Check de Pasajes</h1>
</div>

      <Suspense fallback={<p className="text-center text-gray-500">Cargando lista de pasajeros...</p>}>
        <PasajerosLista />
      </Suspense>
    </div>
  );
}
