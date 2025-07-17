const express = require('express');
const { VerifyUserAuth } = require('../Middlewares/Middleware');
const router = express.Router();

router.get('/logout', VerifyUserAuth ,(req, res) => {
    try {
        res.clearCookie('uid');

        return res.status(200).json({
            success: true,
            message: 'Logout successful',
        });
    } catch (error) {
        console.error('Logout Error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
});

module.exports = router;
