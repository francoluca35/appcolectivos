'use client';
import React, { Suspense } from 'react';
import PasajerosLista from './PasajerosLista';
import BackArrow from '../components/backArrow';

export default function CheckPass() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
   <div className="relative flex items-center justify-center mb-10">
        <BackArrow className="absolute left-0" />
        <h1 className="text-3xl font-bold text-gray-800 text-center">Check de Pasajes</h1>
      </div> 
      <Suspense fallback={<p className="text-center text-gray-500">Cargando lista de pasajeros...</p>}>
        <PasajerosLista />
      </Suspense>
    </div>
  );
}
