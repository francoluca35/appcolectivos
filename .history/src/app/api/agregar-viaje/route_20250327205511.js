import clientPromise from "../../../../lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();

    // Conexión a la base de datos usando clientPromise
    const client = await clientPromise;
    const db = client.db("ventapasajes");
    const collection = db.collection("tickets");

    const result = await collection.insertOne(body);

    return new Response(JSON.stringify({ success: true, id: result.insertedId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al guardar el viaje:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Error al guardar el viaje" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
