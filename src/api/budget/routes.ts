import express from "express";
import { checkJWT } from "../../utilites";
import { createBudget, deleteBudget, getAllBudgetsByUser } from "./controllers";

const router = express.Router();
router.use(checkJWT);

router.get("/", async (req, res) => {
  const { userId } = req.user;
  console.log(userId);
  const response = await getAllBudgetsByUser(userId);
  return res.json(response);
});

// router.post("/", async (req, res) => {
//   const { userId } = req.user;
//   const { categoryId, amount, year, month } = req.body;
//   const response = await createBudget(userId, categoryId, amount, year, month);
//   return res.json(response);
// });

// router.delete("/:budgetId", async (req, res) => {
//   const response = await deleteBudget(req.params.budgetId);
//   return res.json(response);
// });

const budget = router;
export default budget;
