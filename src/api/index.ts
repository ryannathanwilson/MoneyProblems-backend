import express from "express";
import auth from "./auth/routes";
import transaction from "./transaction/routes";
import user from "./user/routes";
import category from "./category/routes";
import budget from "./budget/routes";

const router = express.Router();

router.use("/auth", auth);
router.use("/transaction", transaction);
router.use("/user", user);
router.use("/category", category);
router.use("/budget", budget);

router.get("/");
export default router;
