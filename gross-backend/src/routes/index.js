import { Router } from 'express'
import authRouter from './auth/index.js'
import generateTextRouter from './generateHistory/index.js'
import { TYPES } from '../utils/constant.js'

const router = Router()

router.get('/', async (req, res) => res.json({
    type: TYPES.SUCCESS,
    message: 'Server started.'
}))
router.use(authRouter)
router.use(generateTextRouter)


export default router