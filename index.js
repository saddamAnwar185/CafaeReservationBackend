const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT


// middleWares
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

// ✅ External middlewares
app.use(bodyParser.json()); // Parses JSON (redundant with express.json but ok if needed)
app.use(cookieParser()); // Parses cookies from the request headers
app.use(cors({
  origin: 'https://saddamAnwar185.github.io',
  credentials: true,
  methods: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH']
}));


// Views
const signup = require('./Views/Signup')
const Login = require('./Views/Login')
const logout = require('./Views/Logout')
const verifyUserLogin = require('./Views/VerifyUserLogin')
const bookATable = require('./Views/BookATable')
const showBookings = require('./Views/ShowBookings')
const showAllBookings = require('./Views/ShowAllBookings')
const updateBookingStatus = require('./Views/UpdateBookingStatus')
const deleteBooking = require('./Views/DeleteBooking')

app.get('/', (req, res) => {
  res.send('Hello From Backend')
})
// Routes
app.use('/api', signup)
app.use('/api', Login)

// protected Routes
app.use('/api', logout)
app.use('/api', verifyUserLogin)
app.use('/api', bookATable)
app.use('/api', showBookings)
app.use('/api', showAllBookings)
app.use('/api', updateBookingStatus)
app.use('/api', deleteBooking)


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})