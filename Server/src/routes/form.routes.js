import {Router} from 'express'
import { formCreate } from '../controllers/form.controller.js'


const router = Router()

router.route("/create").post(formCreate)

export default router