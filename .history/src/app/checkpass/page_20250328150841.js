'use client';
import React, { Suspense } from 'react';
import PasajerosLista from './PasajerosLista';
import BackArrow from '../components/backArrow';

export default function CheckPass() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
  {/* Contenedor con flecha + título */}
  <div className="relative mb-8">
  <BackArrow className="absolute left-0 top-1 -translate-y-1/2" />

  <h1 className="text-3xl font-bold text-center text-black">Check de Pasajes</h1>
</div>


  <Suspense fallback={<p className="text-center text-gray-500">Cargando lista de pasajeros...</p>}>
    <PasajerosLista />
  </Suspense>
</div>

  );
}
