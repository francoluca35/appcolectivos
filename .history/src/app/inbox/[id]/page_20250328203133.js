// app/inbox/[id]/page.js
'use client'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

export default function ChatPage() {
  const { id } = useParams()
  const [mensaje, setMensaje] = useState('')
  const [chat, setChat] = useState([
    { from: 'cliente', texto: 'Hola, tengo una duda' },
    { from: 'admin', texto: 'Hola! ¿Cómo te puedo ayudar?' },
  ])

  const enviarRespuesta = () => {
    if (mensaje.trim() === '') return
    setChat([...chat, { from: 'admin', texto: mensaje }])
    setMensaje('')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="bg-white p-4 shadow font-bold">Chat con cliente #{id}</div>
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs p-2 rounded-lg ${
              msg.from === 'admin' ? 'bg-green-200 self-end ml-auto' : 'bg-white'
            }`}
          >
            {msg.texto}
          </div>
        ))}
      </div>
      <div className="p-4 bg-white flex gap-2">
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe una respuesta..."
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={enviarRespuesta}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  )
}
