import express from "express";
import { generateEndPoints } from "./routers/merge";
import { errorHandler, notFoundHandler } from "@recipedia/quasar";

const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get("/", (_, res) => {
  res.send({ message: "Hello API" });
});

app.use(express.json());

generateEndPoints(app);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
