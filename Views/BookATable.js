const express = require('express')
const { VerifyUserAuth } = require('../Middlewares/Middleware')
const { handleBookATable } = require('../Controller/Controller')
const router = express.Router()

router.post('/bookATable/:id', VerifyUserAuth, handleBookATable)

module.exports = router