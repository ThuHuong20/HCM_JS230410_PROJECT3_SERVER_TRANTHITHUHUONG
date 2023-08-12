import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    // category
    findByCategory: async function (category_id) {
        try {
            let products = await prisma.products.findMany({
                where: {
                    category_id: Number(category_id)
                }
            });
            return {
                message: "Get products success!",
                data: products
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi không xác định!"
            }
        }
    },
    readManyRelation: async function (category_id) {
        try {
            let data = await prisma.categories.findUnique({
                where: {
                    id: category_id
                },
                include: {
                    products: true
                }
            })
            return {
                status: true,
                message: 'Lay du lieu thanh cong!',
                data
            }
        } catch (err) {
            return {
                status: false,
                message: 'Lay du lieu that bai'
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
            return {
                status: false,
                message: "get all product that bai"
            }
        }
    },
}