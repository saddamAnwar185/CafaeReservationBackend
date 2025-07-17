const express = require('express')
const { VerifyUserAuth } = require('../Middlewares/Middleware')
const { handleShowBookings } = require('../Controller/Controller')
const router = express.Router()

router.get('/showBookings/:id', VerifyUserAuth, handleShowBookings)

module.exports = router