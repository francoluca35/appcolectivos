'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useResponderMensaje from '@/hooks/useResponderMensaje';
import BackArrow from '@/app/components/backArrow';

export default function ChatRespuesta() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [mensaje, setMensaje] = useState(null);
  const [respuesta, setRespuesta] = useState('');
  const { responder, loading, success, error } = useResponderMensaje();

  useEffect(() => {
    const fetchMensaje = async () => {
      const res = await fetch('/api/verMensajes');
      const data = await res.json();
      const encontrado = data.find(m => m._id === id);
      setMensaje(encontrado);
    };
    fetchMensaje();
  }, [id]);

  const handleEnviar = async () => {
    if (!mensaje || !respuesta.trim()) return;
    await responder({
      para: mensaje.correo,
      asunto: "Respuesta a tu mensaje",
      cuerpo: respuesta,
    });

    await fetch(`/api/marcarRespondido?id=${mensaje._id}`, { method: 'PATCH' });
  };

  if (!mensaje) return <p className="p-6">Cargando mensaje...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <BackArrow />
        <h2 className="text-xl font-bold">Responder a {mensaje.nombre}</h2>
      </div>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <p className="text-sm text-gray-500">Mensaje recibido:</p>
        <p className="mt-2 text-gray-800">{mensaje.mensaje}</p>
      </div>

      <textarea
        rows={5}
        className="w-full border p-2 rounded mb-4"
        placeholder="Escribí tu respuesta..."
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
      />

      <button
        onClick={handleEnviar}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>

      {success && <p className="text-green-600 mt-2">✅ Respuesta enviada</p>}
      {error && <p className="text-red-600 mt-2">❌ {error}</p>}
    </div>
  );
}
