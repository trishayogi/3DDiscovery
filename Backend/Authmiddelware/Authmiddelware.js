const jwt = require("jsonwebtoken")
const authMiddelware = (req, res, next) => {
    // const token = req.headers.authorization?.split(" ")[1];
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(404).json({
            message: "Access denied. please Login ! "
        })

    }
    try {
        const decode = jwt.verify(token,
            process.env.JWT_SECRET
        )
        req.user = decode
        next()
    } catch (error) {
        res.status(500).json({
            message: "Invaild or expries Token !"
        })
    }

}
module.exports = authMiddelware;