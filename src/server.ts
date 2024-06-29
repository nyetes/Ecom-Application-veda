import express from "express";
import bodyParser from "body-parser";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { PrismaClient } from "@prisma/client";
import { Database, Resource } from "@adminjs/prisma";

import productsRouter from "./routes/products";

const prisma = new PrismaClient();
AdminJS.registerAdapter({ Database, Resource });

const app = express();
const PORT = process.env.PORT || 3000;

const adminJs = new AdminJS({
  resources: [
    {
      resource: { model: prisma.product },
      options: {
        listProperties: ["image", "title", "category", "price", "rating"],
      },
    },
    {
      resource: { model: prisma.category },
      options: {
        listProperties: ["name"],
      },
    },
  ],
  rootPath: "/admin",
});

app.use(express.json()); // replaced bodyParser.json() with express.json()
app.use(express.urlencoded({ extended: true })); // added to support URL-encoded bodies

// routes
app.use("/api", productsRouter);

const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
