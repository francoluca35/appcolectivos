'use client';

import { Suspense } from 'react';
import MensajesRecibidos from '../components/MensajesRecibidos';

export default function MensajesPage() {
  return (
    <Suspense fallback={<div className="p-6">Cargando mensajes...</div>}>
      <MensajesRecibidos />
    </Suspense>
  );
}
