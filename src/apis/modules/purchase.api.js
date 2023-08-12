import express from 'express'
const router = express.Router()

import purchaseController from '../../controllers/purchase.controller';

import authencation from '../../middlewares/authencation'

router.post('/order', purchaseController.createReceipt)
router.post('/zalo-create', purchaseController.zaloCreate)
router.get('/zalo-confirm/:tradeId', purchaseController.zaloCheck)
router.post('/:user_id', authencation.checkToken, purchaseController.addToCart)
router.get('/:user_id', authencation.checkToken, purchaseController.findCart)
router.patch('/:user_id', authencation.checkToken, purchaseController.updateCart)

export default router;