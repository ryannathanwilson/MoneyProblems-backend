import express from "express";
import { checkJWT } from "../../utilites";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactionsByUser,
  getTransactionsByYear,
} from "./controllers";

const router = express.Router();
router.use(checkJWT);

router.get("/", async (req, res, next) => {
  const { userId } = req.user;
  const response = await getAllTransactionsByUser(userId, next);
  return res.json(response);
});

router.get("/by-year/:year/", async (req, res, next) => {
  const { userId } = req.user;
  const { year } = req.params;
  const response = await getTransactionsByYear(year, userId, next);
  return res.json(response);
});

router.post("/", async (req, res, next) => {
  const { userId } = req.user;
  const { categoryId, amount, date, year } = req.body;
  const response = await createTransaction(
    userId,
    categoryId,
    amount,
    date,
    year,
    next
  );
  return res.json(response);
});

router.delete("/:budgetId", async (req, res, next) => {
  const { userId } = req.user;
  const response = await deleteTransaction(req.params.budgetId, userId, next);
  return res.json(response);
});

const budget = router;
export default budget;
