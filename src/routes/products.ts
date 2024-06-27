import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

export default router;
