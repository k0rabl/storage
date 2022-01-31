import { Router } from 'express'
import { FileController } from '../controllers/filesC.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = new Router()
const controller = new FileController()

router.post('', authMiddleware, controller.createDir)
router.post('/delete', authMiddleware, controller.deleteFile)
router.post('/upload', authMiddleware, controller.uploadFiles)
router.get('/get', authMiddleware, controller.getFiles)

export default router
