import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

import productsRouter from "./routes/products";

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3000;

let AdminJS;
let AdminJSExpress;
let Database;
let Resource;

Promise.all([
  import("adminjs"),
  import("@adminjs/express"),
  import("@adminjs/prisma"),
]).then(([adminjs, adminjsExpress, adminjsPrisma]) => {
  AdminJS = adminjs.default;
  AdminJSExpress = adminjsExpress.default;
  Database = adminjsPrisma.Database;
  Resource = adminjsPrisma.Resource;

  AdminJS.registerAdapter({ Database, Resource });

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

  app.use(bodyParser.json());

  // routes
  app.use("/api", productsRouter);

  const adminRouter = AdminJSExpress.buildRouter(adminJs);
  app.use(adminJs.options.rootPath, adminRouter);

  app.listen(PORT, () =>
    console.log(`Server running on port http://localhost:${PORT}`)
  );
});
