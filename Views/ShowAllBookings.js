const express = require('express')
const { VerifyUserAuth } = require('../Middlewares/Middleware')
const router = express.Router()
const {Booking} = require('../Model/Model')

router.get('/showAllBookings', VerifyUserAuth, async(req, res) => {
    try {
        const AllBookings = await Booking.find({}).populate('createdBy')
        if(AllBookings) {
            return res.json({ AllBookings })
        }
    } catch (error) {
        console.log(error)
        res.json({
            message: "Internal Server Error"
        })
    }
})

module.exports = router