import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./controllers/auth.controller"; // Make sure this exports a Router

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/login", authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
