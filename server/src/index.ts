import "reflect-metadata";
import createApp from "./server/app";

const app = createApp();

app.listen(process.env.PORT, () => {
  console.log("Server listening on port 3000");
});