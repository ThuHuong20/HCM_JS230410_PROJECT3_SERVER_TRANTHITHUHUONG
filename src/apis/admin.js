// import express from "express";
// const router = express.Router();

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// router.use("/create-data", async (req, res) => {
//     try {
//         let messageString = 'Tạo dữ liệu thành công cho các bảng sau: ';
//         // create data categories
//         await prisma.categories.createMany({
//             data: categories,
//             skipDuplicates: true,
//         })
//         messageString += "Categories "

//         return res.status(200).json(
//             {
//                 message: messageString
//             }
//         )
//     } catch (err) {
//         return res.status(500).json(
//             {
//                 message: "Lỗi cú pháp!"
//             }
//         )
//     }
// })

// module.exports = router;// 