// app/api/mensajes/route.js
import clientPromise from "../../../../lib/mongobg";

export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("ventapasajes");
    const collection = db.collection("mensajes");

    // TTL index para eliminar mensajes en 48 hs
    await collection.createIndex({ fecha: 1 }, { expireAfterSeconds: 172800 });

    const result = await collection.insertOne({
      ...body,
      fecha: new Date(),
      respondido: false
    });

    return Response.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("Error al guardar el mensaje:", error);
    return Response.json({ success: false, error: "Error al guardar el mensaje" }, { status: 500 });
  }
}
