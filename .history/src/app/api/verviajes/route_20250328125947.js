import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongobg";

// GET: Obtener todos los viajes
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ventapasajes");
    const collection = db.collection("tickets");

    const viajes = await collection.find({}).toArray();

    return new Response(JSON.stringify(viajes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener viajes:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Error al obtener viajes" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// DELETE: Eliminar un viaje por ID
export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ success: false, error: "ID no proporcionado" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await clientPromise;
    const db = client.db("ventapasajes");
    const collection = db.collection("tickets");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return new Response(JSON.stringify({ success: true, message: "Viaje eliminado" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ success: false, message: "Viaje no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error al eliminar viaje:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Error al eliminar viaje" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
