'use client';
import React, { Suspense } from 'react';
import PasajerosLista from './PasajerosLista';
import BackArrow from '../components/backArrow';

export default function CheckPass() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="relative flex items-center justify-center mb-8 h-10">

    <button
      className="transition transform hover:scale-110 active:scale-95 hover:-translate-x-1"
      title="Volver"
    >
      <BackArrow />
    </button>


  {/* Título centrado */}
  <h1 className="text-3xl font-bold text-black text-center leading-none">
    Check de Pasajes
  </h1>
</div>

      <Suspense fallback={<p className="text-center text-gray-500">Cargando lista de pasajeros...</p>}>
        <PasajerosLista />
      </Suspense>
    </div>
  );
}
