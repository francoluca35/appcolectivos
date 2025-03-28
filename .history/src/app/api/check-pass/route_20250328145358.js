
import clientPromise from "../../../../lib/mongobg";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ventapasajes");
    const collection = db.collection("pagos");

    const data = await collection.find({}).toArray();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error al obtener pasajeros:", error);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
    });
  }
}
