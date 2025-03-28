'use client';
import React, { Suspense } from 'react';
import BackArrow from '../components/backArrow';
import ViajesListContent from './ViajesListContent';

export default function ListaViajes() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* Encabezado con botón y título centrado */}
      <div className="relative flex items-center justify-center mb-10">
        <BackArrow className="absolute left-0" />
        <h1 className="text-3xl font-bold text-gray-800 text-center">Lista de Viajes</h1>
      </div>

      <Suspense fallback={<p className="text-center text-gray-500">Cargando viajes...</p>}>
        <ViajesListContent />
      </Suspense>
    </div>
  );
}
