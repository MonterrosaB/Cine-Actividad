import e from "express";
import passwordRecoveryController from "../controllers/recoveryPasswordController.js";

const router = e.Router();

router.route("/requestCode").post(passwordRecoveryController.requestCode);
router.route("/verifyCode").post(passwordRecoveryController.verifyCode);
router.route("/newPassword").post(passwordRecoveryController.newPassword);


export default router;