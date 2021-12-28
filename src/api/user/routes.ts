import express from 'express'
import {checkJWT} from '../../utilites'
import {createUser, deleteUser, getUser, getAllUsers} from './controllers'

const router = express.Router()
router.use(checkJWT)

router.get('/', async (req, res) => {
const response = await getAllUsers()
return res.json(response)
})

router.get('/:userId', async (req, res) => {
  const response = await getUser(req.params.userId)
  return res.json(response)
})

router.post('/', async (req, res) => {
  const user = req.body
  const response = await createUser(user)
  return res.json(response)
})

router.delete('/:userId', async(req, res) => {
  const response = await deleteUser(req.params.userId)
  return res.json(response)
})

router.patch('/', )


export { router as user }
