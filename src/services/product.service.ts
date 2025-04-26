import { Request, Response } from "express";
import { db } from "../config/db";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ProductUpdateSchema } from "../dto/schemas/update-product.schema";

export const createProduct = async (req: AuthRequest, res: Response) => {
  const { name, description, price, company, category } = req.body;
  const userId = req.user!.id;

  try {
    await db.query(
      "INSERT INTO products (name, description, price, company, category, user_id) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, price, company, category, userId]
    );
    res.status(201).json({ message: "Product created" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error });
  }
};

export const getAllProducts = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  try {
    const [rows] = await db.query("SELECT * FROM products WHERE user_id = ?", [
      userId,
    ]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to get products", error });
  }
};

export const getProductById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;

  try {
    const [rows]: any = await db.query(
      "SELECT * FROM products WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    const product = rows[0];
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to get product", error });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;

  const validation = ProductUpdateSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: validation.error.flatten().fieldErrors,
    });
    return;
  }

  const updates = validation.data;

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ message: "No fields provided for update" });
    return;
  }

  const fields = Object.keys(updates)
    .map((field) => `${field} = ?`)
    .join(", ");
  const values = Object.values(updates);

  try {
    const [result]: any = await db.query(
      `UPDATE products SET ${fields} WHERE id = ? AND user_id = ?`,
      [...values, id, userId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Product not found or unauthorized" });
      return;
    }

    res.json({ message: "Product updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;

  try {
    const [result]: any = await db.query(
      "DELETE FROM products WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Product not found or unauthorized" });
      return;
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};
