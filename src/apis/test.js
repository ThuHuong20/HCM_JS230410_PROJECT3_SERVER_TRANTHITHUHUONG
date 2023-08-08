// import express from 'express';
// const router = express.Router();

// import productModel from '../models/product.model'

// router.use('/', async (req, res) => {

//     let productOptions = req.body.options;
//     delete req.body.options;

//     let productInfor = req.body;

//     for (let i in productOptions) {
//         productOptions[i].product_option_pictures = {
//             create: productOptions[i].pictures
//         }
//         delete productOptions[i].pictures;
//     }

//     let result = await productModel.create(
//         {
//             productInfor,
//             productOptions
//         }
//     );

// })

// module.exports = router;