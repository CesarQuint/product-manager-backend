import { Router } from "express";
import { register } from "../services/register.service";
import { validate } from "../middlewares/validate.middleware";
import { RegisterSchema } from "../dto/schemas/register.schema";
const router = Router();

router.post("/sign-in", validate(RegisterSchema), register);

export default router;
