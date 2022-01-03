import express from "express";
import { checkJWT } from "../../utilites";
import {
  createCategory,
  deleteCategory,
  getAllCategoriesByUser,
  updateCategory,
} from "./controllers";

const router = express.Router();
router.use(checkJWT);

router.get("/", async (req, res, next) => {
  const { userId } = req.user;
  const response = await getAllCategoriesByUser(userId, next);
  return res.json(response);
});

router.post("/", async (req, res, next) => {
  const { userId } = req.user;
  const { category } = req.body;
  const response = await createCategory(userId, category, next);
  return res.json(response);
});

router.delete("/delete/:categoryId", async (req, res, next) => {
  const { userId } = req.user;
  const response = await deleteCategory(req.params.categoryId, userId, next);
  return res.json(response);
});

router.patch("/update/:categoryId", async (req, res, next) => {
  const { userId } = req.user;
  const categoryDetailsToUpdate = req.body;
  const response = await updateCategory(
    userId,
    req.params.categoryId,
    categoryDetailsToUpdate,
    next
  );
  return res.json(response);
});

const category = router;
export default category;
