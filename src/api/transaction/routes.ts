import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
  return res.json('transaction route')
})

router.get('/example',async (_, res) => {
  return res.json('transaction example')
})


export { router as transaction }
