import express from "express";
import * as userSchemas from "../../models/User.js";
import { validateBody } from "../../decorators/index.js";
import authController from "../../controllers/auth-controller.js";
import { authenticate } from "../../middlewares/index.js";

const authRouter = express.Router();
const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userSigninValidate = validateBody(userSchemas.userSigninSchema);

authRouter.post("/register", userSignupValidate, authController.signup);
authRouter.post("/login", userSigninValidate, authController.signin);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.signout);

export default authRouter;