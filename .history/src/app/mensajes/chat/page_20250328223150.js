'use client';

import { Suspense } from 'react';
import ChatRespuesta from '@/components/ChatRespuesta';

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-6">Cargando chat...</div>}>
      <ChatRespuesta />
    </Suspense>
  );
}
