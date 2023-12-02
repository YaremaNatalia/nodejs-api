import express from "express";
import * as userSchemas from "../../models/User.js";
import { validateBody } from "../../decorators/index.js";
import authController from "../../controllers/auth-controller.js";
import {
  authenticate,
  upload,
  processedAvatar,
} from "../../middlewares/index.js";

const authRouter = express.Router();
const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userSigninValidate = validateBody(userSchemas.userSigninSchema);
const userUpdateSubscription = validateBody(
  userSchemas.userUpdateSubscriptionSchema
);

authRouter.post("/register", userSignupValidate, authController.signup);
authRouter.post("/login", userSigninValidate, authController.signin);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.signout);
authRouter.patch(
  "/",
  authenticate,
  userUpdateSubscription,
  authController.updateSubscription
);

// upload мідлвара для збереження файла
// upload.fields([{name:"avatar", maxCount: 1}]) очікуємо кілька полів
// upload.array("avatar", 5)  очікуємо кілька файлів в одному полі
authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  processedAvatar,
  authController.updateAvatar
);

export default authRouter;
