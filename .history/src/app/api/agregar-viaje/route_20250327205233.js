import clientPromise from "../../../../lib/mongobg";

const uri = "mongodb://localhost:27017"; // o tu URI de Mongo Atlas
const client = new MongoClient(uri);

export async function POST(req) {
  try {
    const body = await req.json();
    await client.connect();
    const db = client.db("ventapasajes");
    const collection = db.collection("tickets");

    const result = await collection.insertOne(body);
    return Response.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("Error al guardar el viaje:", error);
    return Response.json({ success: false, error: "Error al guardar el viaje" }, { status: 500 });
  }
}
