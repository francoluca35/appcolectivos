
import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongobg";

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db("ventapasajes");

    await db.collection("estadisticas").updateOne(
      { tipo: "contadorViajesRealizados" },
      { $inc: { total: 1 } },
      { upsert: true }
    );

    return NextResponse.json({ mensaje: "Contador actualizado" });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar contador" }, { status: 500 });
  }
}
