import purchaseModel from "../models/purchase.model";
import CryptoJS from 'crypto-js'
import moment from 'moment'
import axios from 'axios'
import qs from 'qs'
export default {
    addToCart: async function (req, res) {
        try {
            req.body.quantity = Number(req.body.quantity);
            req.body.product_id = Number(req.body.product_id);
            let modelRes = await purchaseModel.addToCart(Number(req.params.user_id), req.body);
            return res.status(modelRes.status ? 200 : 213).json(modelRes)
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller!"
            })
        }
    },
    findCart: async function (req, res) {
        try {
            let modelRes = await purchaseModel.findCart(Number(req.params.user_id));
            return res.status(modelRes.status ? 200 : 213).json(modelRes)
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller!"
            })
        }
    },
    updateCart: async function (req, res) {
        try {
            let modelRes = await purchaseModel.updateCart(req.body);
            return res.status(modelRes.status ? 200 : 213).json(modelRes)
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller!"
            })
        }
    },
    createReceipt: async function (req, res) {
        try {
            let modelRes = await purchaseModel.createReceipt(req.body);
            return res.status(modelRes.status ? 200 : 213).json(modelRes)
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller createReceipt!"
            })
        }
    },
    zaloCreate: async function (req, res) {
        // APP INFO
        const config = {
            appid: "554",
            key1: "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn",
            key2: "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny",
            endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder"
        };

        const embeddata = {
            merchantinfo: "embeddata123"
        };

        const items = [{
            itemid: "knb",
            itemname: "kim nguyen bao",
            itemprice: 198400,
            itemquantity: 1
        }];

        const order = {
            appid: config.appid,
            apptransid: `${moment().format('YYMMDD')}_${Date.now()}_${req.body.receipt_code}`, // mã giao dich có định dạng yyMMdd_xxxx
            appuser: "admin",
            apptime: Date.now(),
            item: JSON.stringify(items),
            embeddata: JSON.stringify(embeddata),
            amount: Number(req.body.total),
            description: "Thanh Toán Cho Shop Hương",
            bankcode: "zalopayapp",
        };

        const data = config.appid + "|" + order.apptransid + "|" + order.appuser + "|" + order.amount + "|" + order.apptime + "|" + order.embeddata + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        axios.post(config.endpoint, null, { params: order })
            .then(res => {
                console.log("apptransid", order.apptransid)
                console.log(res.data);
            })
            .catch(err => console.log(err));
    },
    zaloCheck: async function (req, res) {
        let postData = {
            appid: "554",
            key1: "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn",
            apptransid: "230811_1691754419034_129f517f-0105-4a3e-8102-69bd25994b3f", // Input your apptransid
        }

        let data = postData.appid + "|" + postData.apptransid + "|" + postData.key1; // appid|apptransid|key1
        postData.mac = CryptoJS.HmacSHA256(data, postData.key1).toString();


        let postConfig = {
            method: 'post',
            url: "https://sandbox.zalopay.com.vn/v001/tpe/getstatusbyapptransid",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(postData)
        };

        axios(postConfig)
            .then(function (response) {
                console.log("response.data", response.data);
                res.json(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}