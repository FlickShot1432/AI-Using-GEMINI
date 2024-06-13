import { Router } from 'express'
import GenerateTextController from "../../controllers/socket/index.js"
import Middlewares from '../../middlewares/index.js'

const generateTextRouter = Router()

generateTextRouter.post('/textAI/generate', Middlewares.upload().array('images', 5), GenerateTextController.generateText)

export default generateTextRouter