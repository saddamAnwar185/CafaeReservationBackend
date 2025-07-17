const express = require('express')
const { handleSignUp } = require('../Controller/Controller')
const router = express.Router()

router.post('/signup', handleSignUp)

module.exports = router