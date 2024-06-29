import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fetchAndStoreProducts() {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    const products = response.data.products;

    for (const product of products) {
      await prisma.product.create({
        data: {
          title: product.title,
          description: product.description,
          price: product.price,
          rating: product.rating,
          stock: product.stock ?? 0,
          image: product.image ?? "",
          category: {
            connectOrCreate: {
              where: { name: product.category },
              create: { name: product.category },
            },
          },
        },
      });
    }
    console.log("Products stored successfully.");
  } catch (error) {
    console.error("Error fetching or storing products:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchAndStoreProducts();
