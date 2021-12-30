import express from "express";
import { checkJWT } from "../../utilites";
import {
  createCategory,
  deleteCategory,
  getAllCategoriesByUser,
} from "./controllers";

const router = express.Router();
router.use(checkJWT);

router.get("/", async (req, res) => {
  const { userId } = req.user;
  console.log(userId);
  const response = await getAllCategoriesByUser(userId);
  return res.json(response);
});

router.post("/", async (req, res) => {
  const { userId } = req.user;
  const { category } = req.body;
  const response = await createCategory(userId, category);
  return res.json(response);
});

router.delete("/:categoryId", async (req, res) => {
  const response = await deleteCategory(req.params.categoryId);
  return res.json(response);
});

const category = router;
export default category;
