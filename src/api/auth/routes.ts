import express from 'express'
import { login, refreshToken } from './controllers'

const router = express.Router()

router.post('/login', async (req,res) => {
  const {username, password} = req.body
  console.log(username)
  const response = await login(username, password)
  return res.json(response)
})

router.post('/refresh-token', async (req, res) => {
  const response = refreshToken(req.body.refreshToken)
  return res.json(response)
})

export { router as auth }
