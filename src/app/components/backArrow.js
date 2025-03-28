"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // O podés usar un ícono de FontAwesome si preferís

export default function BackArrow() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/homeadmin")}
      className="fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
      aria-label="Volver al inicio"
    >
      <ArrowLeft className="h-5 w-5 text-gray-700" />
    </button>
  );
}
