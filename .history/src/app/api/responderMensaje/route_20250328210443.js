// app/api/responderMensaje/route.js
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { para, asunto, cuerpo } = await req.json();

    const client = await clientPromise;
    const db = client.db("ventapasajes");
    const collection = db.collection("mensajes");

    // Guarda la respuesta en el documento del mensaje (buscando por correo)
    await collection.updateOne(
      { correo: para },
      { $set: { respuesta: cuerpo, respondido: true } }
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error al responder mensaje:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
