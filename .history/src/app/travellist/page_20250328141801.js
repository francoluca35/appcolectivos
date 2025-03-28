'use client';
import React, { Suspense } from 'react';
import BackArrow from '../components/backArrow';
import ViajesListContent from '../components/ViajesListContent';

export default function ListaViajes() {
  return (
    <>
      <BackArrow />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Lista de Viajes</h1>

        <Suspense fallback={<p className="text-center text-gray-500">Cargando viajes...</p>}>
          <ViajesListContent />
        </Suspense>
      </div>
    </>
  );
}
