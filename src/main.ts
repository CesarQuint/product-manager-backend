import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./controllers/auth.controller";
import accountRoutes from "./controllers/account.controller";
import productRoutes from "./controllers/product.controller";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/account", accountRoutes);
app.use("/product", productRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
