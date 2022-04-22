import { MongoClient } from "mongodb";

async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.hors6.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
  );
  return client;
}
async function insertDocument(client, data) {
  const db = client.db();
  await db.collection("messages").insertOne(data);
}

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input!" });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;
    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: "connecting failed!" });
      return;
    }

    try {
      await insertDocument(client, newMessage);
      client.close();
    } catch (err) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "successfully updated" });
  }
}

export default handler;
