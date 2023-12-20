import express from "express";
import * as userSchemas from "../../models/User.js";
import { validateBody } from "../../decorators/index.js";
import authController from "../../controllers/auth-controller.js";
import {
  isEmptyBody,
  authenticate,
  upload,
  processedAvatar,
} from "../../middlewares/index.js";

const authRouter = express.Router();
const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userResendVerifyValidate = validateBody(userSchemas.userEmailSchema);
const userSigninValidate = validateBody(userSchemas.userSigninSchema);
const userUpdateSubscriptionValidate = validateBody(
  userSchemas.userUpdateSubscriptionSchema
);

authRouter.post(
  "/register",
  isEmptyBody,
  userSignupValidate,
  authController.signup
);
authRouter.get("/verify/:verificationToken", authController.verify);
authRouter.post(
  "/verify",
  isEmptyBody,
  userResendVerifyValidate,
  authController.resendVerify
);
authRouter.post(
  "/login",
  isEmptyBody,
  userSigninValidate,
  authController.signin
);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.signout);
authRouter.patch(
  "/",
  authenticate,
  userUpdateSubscriptionValidate,
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
