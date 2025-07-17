const express = require('express')
const { VerifyUserAuth } = require('../Middlewares/Middleware')
const { deleteBooking } = require('../Controller/Controller')
const router = express.Router()

router.delete('/deleteBooking/:id', VerifyUserAuth, deleteBooking)

module.exports = router