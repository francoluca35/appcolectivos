'use client';

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackArrow({ className = "" }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/homeadmin")}
      className={`bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition ${className}`}
      aria-label="Volver al inicio"
    >
      <ArrowLeft className="h-5 w-5 text-gray-700" />
    </button>
  );
}
