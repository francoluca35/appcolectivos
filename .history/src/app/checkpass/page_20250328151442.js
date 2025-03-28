'use client';
import React, { Suspense } from 'react';
import PasajerosLista from './PasajerosLista';
import BackArrow from '../components/backArrow';
import { ArrowLeft } from 'lucide-react';

export default function CheckPass() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="relative flex items-center justify-center mb-8">
  <button
    onClick={() => router.push("/homeadmin")}
    className="absolute left-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
    aria-label="Volver al inicio"
  >
    <ArrowLeft className="h-5 w-5 text-gray-700" />
  </button>

  <h1 className="text-3xl font-bold text-black text-center">Check de Pasajes</h1>
</div>

      <Suspense fallback={<p className="text-center text-gray-500">Cargando lista de pasajeros...</p>}>
        <PasajerosLista />
      </Suspense>
    </div>
  );
}
