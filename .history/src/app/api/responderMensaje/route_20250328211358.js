import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongobg';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { para, asunto, cuerpo } = await req.json();

    if (!para || !cuerpo) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("ventapasajes");
    const collection = db.collection("mensajes");

    // 📝 Guardar respuesta en MongoDB
    await collection.updateOne(
      { correo: para },
      { $set: { respuesta: cuerpo, respondido: true } }
    );

    // 📧 Enviar correo
    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASS;

    if (!user || !pass) {
      console.error('Variables de entorno faltantes');
      return NextResponse.json({ error: 'Configuración de correo inválida' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: `"Transportes Maurello" <${user}>`,
      to: para,
      subject: asunto || 'Respuesta de Transportes Maurello',
      html: `<p>${cuerpo}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al enviar respuesta:', error.response || error.message || error);
    return NextResponse.json({ error: 'Error al enviar respuesta' }, { status: 500 });
  }
}
