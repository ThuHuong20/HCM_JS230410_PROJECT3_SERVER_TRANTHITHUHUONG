import categoryModel from '../models/category.model';

export default {
    findByCategory: async function (req, res) {
        try {
            let result = await categoryModel.readManyRelation(parseInt(req.params.category_id));
            return res.status(200).json({
                message: result.message,
                data: result.data
            })


        } catch (err) {
            return res.status(500).json({
                message: "Lỗi không xác định!"
            })
        }
    },
    findAllCategories: async (req, res) => {
        try {
            let modelRes = await categoryModel.findAll()

            return res.status(modelRes.status ? 200 : 214).json(modelRes)

        } catch (err) {
            return res.status(500).json(
                {
                    message: "Bad request products !"
                }
            )
        }
    },


}