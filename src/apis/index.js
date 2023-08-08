/* Create Express Router */
import express from 'express'
const router = express.Router()

import v1Api from './v1'
router.use('/v1', v1Api)

// import adminMiddleware from '../middlewares/admin.middleware';
// import adminApi from './admin';
// router.use('/admin', adminMiddleware.checkAdmin, adminApi);

export default router;