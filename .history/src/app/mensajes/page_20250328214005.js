'use client'
import useVerMensajes from "@/hooks/useVerMensajes";
import { useRouter } from "next/navigation";
import BackArrow from "../components/backArrow";

export default function MensajesRecibidos() {
  const { mensajes, loading, error } = useVerMensajes();
  const router = useRouter();

  // Calcular fecha de hace 7 días
  const haceUnaSemana = new Date();
  haceUnaSemana.setDate(haceUnaSemana.getDate() - 7);

  // Filtrar por fecha y responder estado
  const mensajesSemana = mensajes.filter(m =>
    new Date(m.fecha) >= haceUnaSemana
  );

  const noLeidos = mensajesSemana
    .filter(m => !m.respondido)
    .slice(0, 20);

  const respondidos = mensajesSemana
    .filter(m => m.respondido)
    .slice(0, 20);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-white to-blue-900 p-6">
      <div className="max-w-3xl mx-auto bg-black/80 bg-opacity-90 rounded shadow-md p-6 space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BackArrow />
            <h2 className="text-2xl font-bold text-white">📩 Mensajes</h2>
          </div>

          <div className="bg-white rounded shadow p-4">
            {loading && <p className="text-gray-500">Cargando...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && noLeidos.length === 0 ? (
              <p className="text-gray-500">No hay mensajes nuevos esta semana.</p>
            ) : (
              <ul className="space-y-4">
                {noLeidos.map((msg) => (
                  <li
                    key={msg._id}
                    onClick={() => router.push(`/mensajes/chat?id=${msg._id}`)}
                    className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded transition"
                  >
                    <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
                      {msg.nombre[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{msg.nombre}</p>
                      <p className="text-sm text-gray-600 truncate">{msg.mensaje}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.fecha).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Sección de mensajes respondidos */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">✅ Respondidos</h3>
          <div className="bg-white rounded shadow p-4">
            {respondidos.length === 0 ? (
              <p className="text-gray-500">No hay mensajes respondidos esta semana.</p>
            ) : (
              <ul className="space-y-4">
                {respondidos.map((msg) => (
                  <li
                    key={msg._id}
                    className="flex items-center gap-4 bg-gray-50 p-2 rounded"
                  >
                    <div className="w-10 h-10 bg-green-600 text-white flex items-center justify-center rounded-full font-bold">
                      {msg.nombre[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{msg.nombre}</p>
                      <p className="text-sm text-gray-600 truncate">{msg.mensaje}</p>
                      <p className="text-xs text-green-700 mt-1">
                        Respuesta: {msg.respuesta}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.fecha).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>cf
        </div>
      </div>
    </div>
  );
}
