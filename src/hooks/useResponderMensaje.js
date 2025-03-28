'use client'
import { useState } from 'react';
import axios from 'axios';

export default function useResponderMensaje() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const responder = async ({ para, asunto, cuerpo }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await axios.post('/api/responderMensaje', { para, asunto, cuerpo });
      if (!res.data.success) throw new Error('Error al enviar respuesta');
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { responder, loading, error, success };
}
