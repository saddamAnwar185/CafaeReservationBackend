const mongoose = require('mongoose');
require('dotenv').config()

const url = process.env.MONGODB_URl

mongoose.connect(url).then(()=>{
    console.log('connected')
}).catch((error) => {
    console.log(error)
})

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  guests: {
    type: Number,
    required: true,
    min: 1
  },
  time: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String, // or use Date type if you want: type: Date
    required: true,
    trim: true
  },
  status: {
    type: String,
    default: 'processing',
    enum: ['processing', 'confirmed', 'cancelled']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // or set to String if no user model yet
    required: true
  }
}, {
  timestamps: true
});

const Users = mongoose.model('User', userSchema);
const Booking = mongoose.model('Booking', bookingSchema);



module.exports = {
    Users,
    Booking
}
