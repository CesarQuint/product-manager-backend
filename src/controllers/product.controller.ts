import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../services/product.service";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { ProductSchema } from "../dto/schemas/create-product.schema";
import { ProductUpdateSchema } from "../dto/schemas/update-product.schema";

const router = Router();

router.post("/", [authenticate, validate(ProductSchema)], createProduct);
router.get("/", authenticate, getAllProducts);
router.get("/:id", authenticate, getProductById);
router.put(
  "/:id",
  [authenticate, validate(ProductUpdateSchema)],
  updateProduct
);
router.delete("/:id", authenticate, deleteProduct);

export default router;
