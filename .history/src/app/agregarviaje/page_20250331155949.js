"use client";
import React, { Suspense } from "react";
import BackArrow from "../components/backArrow";
import AgregarViajeForm from "./AgregarViajeForm";

export default function AgregarViaje() {
  return (
<div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-4xl">
  <div className="flex items-center gap-2 mb-6">
    <BackArrow />
    <h2 className="text-2xl text-white font-bold">Agregar nuevo viaje</h2>
  </div>
  <Suspense fallback={<p className="text-center text-white">Cargando formulario...</p>}>
    <AgregarViajeForm />
  </Suspense>
</div>

  );
}
