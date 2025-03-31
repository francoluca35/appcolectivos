
import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongobg";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ventapasajes");

    const pagos = await db.collection("pagos").find({}).toArray();

    // Leer contador de viajes realizados desde colección 'estadisticas'
    const contador = await db.collection("estadisticas").findOne({ tipo: "contadorViajesRealizados" });
    const cantidadViajes = contador?.total || 0;

    const ahora = new Date();
    const mesActual = ahora.getMonth();
    const anioActual = ahora.getFullYear();

    let cantidadPasajeros = 0;
    let recaudacionMensual = 0;
    let recaudacionAnual = 0;

    pagos.forEach((pago) => {
      cantidadPasajeros += pago.cantidad || 0;

      const fechaViaje = new Date(pago.fechaViaje);
      const mesViaje = fechaViaje.getMonth();
      const anioViaje = fechaViaje.getFullYear();

      if (anioViaje === anioActual) {
        recaudacionAnual += pago.total || 0;
        if (mesViaje === mesActual) {
          recaudacionMensual += pago.total || 0;
        }
      }
    });

    return NextResponse.json({
      cantidadViajes,
      cantidadPasajeros,
      recaudacionMensual,
      recaudacionAnual,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener estadísticas" }, { status: 500 });
  }
}
