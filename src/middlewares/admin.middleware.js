let isAdmin = false;

module.exports = {
    checkAdmin: function (req, res, next) {
        if (!isAdmin) {
            return res.status(500).json({
                message: "Bạn cần có quyền admin để truy cập các api này!"
            })
        }

        next();
    }
}