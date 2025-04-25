import { Request, Response } from "express";
import { db } from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const [users]: any = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = users[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};
