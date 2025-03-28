import clientPromise from "./mongodb";

export async function validateUser(username, password) {
  const client = await clientPromise;
  const db = client.db("ventapasajes");
  const user = await db.collection("users").findOne({ username, password });
  return user !== null;
}