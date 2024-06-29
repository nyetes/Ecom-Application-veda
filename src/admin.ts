import express from "express";
import { Database, Resource } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";

const prisma = new PrismaClient();
AdminJS.registerAdapter({ Database, Resource });

const adminJS = new AdminJS({
  resources: [
    {
      resource: { model: prisma.product },
      option: {
        listProperties: ["image", "title", "category", "price", "rating"],
        // listProperties: ["id", "name", "price"],
        // showProperties: ["id", "name", "price"],
        // editProperties: ["name", "price"],
        // filterProperties: ["name", "price"],
      },
    },
    {
      resource: { model: prisma.category },
      option: {
        listProperties: ["name"],
        // listProperties: ["id", "name"],
        // showProperties: ["id", "name"],
        // editProperties: ["name"],
        // filterProperties: ["name"],
      },
    },
  ],
  rootPath: "/admin",
});

const app = express();
const PORT = process.env.PORT || 3000;

const adminRouter = AdminJSExpress.buildRouter(adminJS);
app.use(adminJS.options.rootPath, adminRouter);

export default adminRouter;
