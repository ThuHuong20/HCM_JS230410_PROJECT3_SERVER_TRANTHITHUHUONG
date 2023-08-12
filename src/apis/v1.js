/* Create Express Router */
import express from 'express'
const router = express.Router()

import userModule from './modules/user'
router.use('/users', userModule)

import categoryModule from './modules/category';
router.use('/categories', categoryModule);

import productModule from './modules/product';
router.use('/products', productModule);

import purchaseModule from './modules/purchase.api';
router.use('/purchase', purchaseModule);



export default router;