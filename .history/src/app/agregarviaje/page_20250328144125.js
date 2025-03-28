"use client";
import React, { Suspense } from "react";
import BackArrow from "../components/backArrow";
import AgregarViajeForm from "./AgregarViajeForm";

export default function AgregarViaje() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 relative">
      <BackArrow />
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Agregar nuevo viaje</h2>
        <Suspense fallback={<p className="text-center text-white">Cargando formulario...</p>}>
          <AgregarViajeForm />
        </Suspense>
      </div>
    </div>
  );
}
