const express = require('express')
const { VerifyUserAuth } = require('../Middlewares/Middleware')
const { updateBookingStatus } = require('../Controller/Controller')
const router = express.Router()

router.put('/updateBookingStatus/:id', VerifyUserAuth, updateBookingStatus)

module.exports = router