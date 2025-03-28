import { MongoClient } from "mongodb";

const MONGODB_URI = "mongodb+srv://franco:123456franco@cluster0.tfbh1gz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DB_NAME = "ventapasajes";

export async function POST(req) {
  try {
    const { username, password } = await req.json(); // Recibir credenciales

    console.log(`🔍 Buscando usuario: ${username}`);
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(DB_NAME);
    const usersCollection = db.collection("users");

    const userData = await usersCollection.findOne({
      "users.username": username,
      "users.password": password,
    });

    client.close();

    if (!userData) {
      return new Response(JSON.stringify({ error: "Usuario o contraseña incorrectos" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Extraer usuario dentro del array
    const user = userData.users.find(user => user.username === username);

    return new Response(JSON.stringify({ username: user.username, role: user.role }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("🚨 Error en autenticación:", error);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
