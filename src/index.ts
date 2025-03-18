import "dotenv/config";
import express from "express";

import { PostgresHelper } from "./db/postgres/helper.js";

const app = express();

app.get("/", async (_, res) => {
  const results = await PostgresHelper.query("SELECT * FROM users;");
  res.send(JSON.stringify(results));
});

app.listen(3000, () => console.log("listening on port 3000"));
