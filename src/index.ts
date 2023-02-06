import { AppDataSource } from "./data-source";
import * as express from "express";
import * as cors from "cors";
import routes from "./routes/index.routes";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) =>
    console.log("Error during Data Source initialization:", error)
  );

const PORT = process.env.PORT || 3333;
const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
