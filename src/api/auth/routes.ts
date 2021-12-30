import express from "express";
import { login, refreshAccessToken } from "./controllers";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const response = await login(username, password);
  return res.json(response);
});

router.post("/refresh-token", async (req, res) => {
  const response = refreshAccessToken(req.body.refreshToken);
  return res.json(response);
});

export default router;
