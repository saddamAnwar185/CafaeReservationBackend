const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const setUser = (user) => {
    const payload = {
        "name": user.name,
        "email": user.email,
        "_id": user._id
    }

    const token = jwt.sign(payload, secret)
    return token
}


const VerifyUserAuth = (req, res, next) => {
    const token = req.cookies?.uid;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Please log in to continue',
        });
    }

    try {
        const decoded = jwt.verify(token, secret);
        return next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Please Login Again',
        });
    }
};


module.exports = {
    setUser,
    VerifyUserAuth
}