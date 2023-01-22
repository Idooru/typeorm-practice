import express from "express";
import { typeOrmConfig } from "./config/typeorm.config";
import { serverMainRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(serverMainRouter);

app.listen(3000, async () => {
  try {
    await typeOrmConfig.initialize();
    console.log("Server is running");
  } catch (err) {
    console.error(err);
  }
});
