'use client'
import { useEffect, useState } from 'react';

export default function useVerMensajes() {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const obtenerMensajes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/verMensajes');
      if (!res.ok) throw new Error('Error al cargar mensajes');
      const data = await res.json();
      setMensajes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerMensajes();
  }, []);

  return { mensajes, loading, error, refetch: obtenerMensajes };
}
