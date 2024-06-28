import express from "express";
import bodyParser from "body-parser";

import productsRouter from "./routes/products";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

//routes
app.use("/api", productsRouter);

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
