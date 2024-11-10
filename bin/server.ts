import { Env } from "@start/env";
import { app } from "./app";

app.listen({ port: Env.PORT, host: "0.0.0.0" }).then(() => {
  console.log("HTTP Server running on http://localhost:3333");
});
