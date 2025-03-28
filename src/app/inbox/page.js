// app/inbox/page.js o src/app/inbox/page.js (si usás app router)
'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const mensajes = [
  { id: '1', nombre: 'Juan', mensaje: 'Hola, tengo una duda...', hora: '10:30' },
  { id: '2', nombre: 'María', mensaje: '¿Cuándo sale el próximo viaje?', hora: '11:00' },
  // ...más mensajes
]

export default function Inbox() {
  const router = useRouter()

  const irAlChat = (id) => {
    router.push(`/inbox/${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">Mensajes</h1>
      <div className="bg-white rounded shadow">
        {mensajes.map((msg) => (
          <div
            key={msg.id}
            onClick={() => irAlChat(msg.id)}
            className="p-4 border-b hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{msg.nombre}</span>
              <span className="text-sm text-gray-500">{msg.hora}</span>
            </div>
            <p className="text-sm text-gray-600 truncate">{msg.mensaje}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
