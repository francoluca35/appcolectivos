'use client'
import useVerMensajes from "@/hooks/useVerMensajes";
import { useRouter } from "next/navigation";
import BackArrow from "../components/backArrow";

export default function MensajesRecibidos() {
  const { mensajes, loading, error } = useVerMensajes();
  const router = useRouter();

  const noLeidos = mensajes.filter(m => !m.respondido);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <BackArrow />
        <h2 className="text-2xl font-bold">📩 Mensajes</h2>
      </div>

      <div className="bg-white rounded shadow p-4">
        {loading && <p className="text-gray-500">Cargando...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && noLeidos.length === 0 ? (
          <p className="text-gray-500">No hay mensajes nuevos.</p>
        ) : (
          <ul className="space-y-4">
            {noLeidos.map((msg) => (
              <li
                key={msg._id}
                onClick={() => router.push(`/mensajes/chat?id=${msg._id}`)}
                className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
                  {msg.nombre[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{msg.nombre}</p>
                  <p className="text-sm text-gray-600 truncate">{msg.mensaje}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(msg.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
