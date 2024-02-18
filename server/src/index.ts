import dotenv from "dotenv";
import next from "next";
import z from "zod";

import { app as server } from "./app";

dotenv.config({ path: [".env.local", ".env"] });

const dev = process.env.NODE_ENV !== "production";
const host = z.string().parse(process.env.NEXT_PUBLIC_API_HOST);
const port = z.number().parse(Number(process.env.NEXT_PUBLIC_API_PORT));

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err?: any) => {
    if (err) throw err;

    console.log(`> UI is ready at http://${host}:${port}`);
    console.log(`> API is ready at http://${host}:${port}/api`);
    console.log(`> Swagger is ready at http://${host}:${port}/docs`);
  });
});
