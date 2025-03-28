// app/api/marcarRespondido/route.js
import clientPromise from "../../../../lib/mongobg";
import { ObjectId } from "mongodb";

export async function PATCH(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    const client = await clientPromise;
    const db = client.db("ventapasajes");
    await db.collection("mensajes").updateOne(
      { _id: new ObjectId(id) },
      { $set: { respondido: true } }
    );

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
