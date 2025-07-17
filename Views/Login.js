const express = require('express')
const { handleLogin } = require('../Controller/Controller')
const router = express.Router()

router.post('/login', handleLogin)

module.exports = router