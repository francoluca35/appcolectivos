
import clientPromise from "../../../../lib/mongobg";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ventapasajes");
    const mensajes = await db
      .collection("mensajes")
      .find({})
      .sort({ fecha: -1 })
      .toArray();

    return Response.json(mensajes);
  } catch (error) {
    return Response.json({ error: "Error al obtener mensajes" }, { status: 500 });
  }
}
