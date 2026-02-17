import { cleanRegex } from "zod/v4/core/util.cjs";
import { ProductCreateInput } from "../../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { generateUniqueSlug } from "../../utils/generateUniqueSlug";
import { generateSKU } from "../../utils/generateSku";
import { Request } from "express";


//create product by admin
const createProduct = async (req:Request) => {

if (req.file) {
  req.body.thumbnail = req.file.path;
}

  const payload = req.body as ProductCreateInput;
const slug = await generateUniqueSlug(payload.name, async (slug) => {
  const existing = await prisma.product.findUnique({
    where: { slug },
    select: { id: true },
  });
  return !!existing;
})   

const sku= generateSKU()
 return await prisma.product.create({ data: {...payload,slug,sku} });
};



//get all products
const getAllProducts = async () => {
  return await prisma.product.findMany();
};


export const productService = {
    createProduct,
    getAllProducts
};