const express = require('express')
const { VerifyUserAuth } = require('../Middlewares/Middleware')
const router = express.Router()

router.get('/verifyUserLogin', VerifyUserAuth, (req, res) => {
    res.json({
        success: true,
        message: 'user is Login'
    })
})

module.exports = router