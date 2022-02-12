import express from "express";
import { checkJWT } from "../../utilites";
import {
  createBudget,
  deleteBudget,
  getAllBudgetsByUser,
  getBudgetByMonth,
  getBudgetByYear,
  updateBudget,
} from "./controllers";

const router = express.Router();
router.use(checkJWT);

router.get("/", async (req, res) => {
  const { userId } = req.user;
  const response = await getAllBudgetsByUser(userId);
  return res.json(response);
});

router.get("/by-year/:year", async (req, res, next) => {
  const { userId } = req.user;
  const { year } = req.params;
  const response = await getBudgetByYear(year, userId, next);
  return res.json(response);
});

router.get("/by-month/:month/:year", async (req, res, next) => {
  const { month, year } = req.params;
  const { userId } = req.user;
  const response = await getBudgetByMonth(month, year, userId, next);
  return res.json(response);
});

router.post("/", async (req, res, next) => {
  const { userId } = req.user;
  const { categoryId, amount, month, year } = req.body;
  const response = await createBudget(
    userId,
    categoryId,
    amount,
    month,
    year,
    next
  );
  return res.json(response);
});

router.delete("/:budgetId", async (req, res) => {
  const response = await deleteBudget(req.params.budgetId);
  return res.json(response);
});

router.patch("/update/:budgetId", async (req, res, next) => {
  const { userId } = req.user;
  const budgetDetailsToUpdate = req.body;
  const response = await updateBudget(
    userId,
    req.params.budgetId,
    budgetDetailsToUpdate,
    next
  );
  return res.json(response);
});

const budget = router;
export default budget;
