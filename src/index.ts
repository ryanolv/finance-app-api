import "dotenv/config";
import express from "express";

import { PostgresHelper } from "./db/postgres/helper.js";

const app = express();
app.use(express.json());

app.get("/", async (_, res) => {
  const results = await PostgresHelper.query("SELECT * FROM users;");
  res.send(JSON.stringify(results));
});

app.post("/api/users", async (req, res) => {
  res.status(201).send("User created");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
