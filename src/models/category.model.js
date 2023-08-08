import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    findByCategory: async function (category_id) {
        console.log("category_id", category_id)
        try {
            let products = await prisma.products.findMany({
                where: {
                    category_id: category_id
                }
            });
            return {
                message: "Get products success!",
                data: products
            }
        } catch (err) {
            console.log("err", err)
            return {
                status: false,
                message: "Lỗi không xác định!"
            }
        }
    },
    findAll: async () => {
        try {
            let categories = await prisma.categories.findMany()
            return {
                status: true,
                message: "get all product thanh cong",
                data: categories
            }
        } catch (err) {
            console.log("err", err);
            return {
                status: false,
                message: "get all product that bai"
            }
        }
    },
}