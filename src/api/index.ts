import express from "express";
import auth from "./auth/routes";
import transaction from "./transaction/routes";
import user from "./user/routes";

const router = express.Router();

router.use("/auth", auth);
router.use("/transaction", transaction);
router.use("/user", user);

router.get("/");
export default router;
