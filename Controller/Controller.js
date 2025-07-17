const { setUser } = require('../Middlewares/Middleware');
const {Users, Booking} = require('../Model/Model')
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return {
      success: true,
      message: 'Password hashed successfully',
      data: hashed,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error hashing password',
      data: null,
    };
  }
};

const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    if (match) {
      return {
        success: true,
        message: 'Password matched',
        data: true,
      };
    } else {
      return {
        success: false,
        message: 'Invalid password',
        data: false,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error comparing password',
      data: null,
    };
  }
};

const handleSignUp = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedResult = await hashPassword(password);
    if (!hashedResult.success) {
      return res.status(500).json(hashedResult);
    }

    const newUser = new Users({
      name,
      email,
      password: hashedResult.data,
      role: role || 'user',
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with this email',
      });
    }

    // Password comparison
    const match = await comparePassword(password, user.password);
    if (!match.success || !match.data) {
      return res.status(401).json({
        success: false,
        message: match.message || 'Incorrect password',
      });
    }

    // Token creation (optional)
    const token = setUser(user); // only if you use JWT
    res.cookie("uid", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login',
    });
  }
};

const handleBookATable = async (req, res) => {
  try {
    const { name, email, guests, time, date } = req.body;
    const userId = req.params.id; // or however you're setting the user

    // Basic validation
    if (!name || !email || !guests || !time || !date) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const booking = new Booking({
      name,
      email,
      guests,
      time,
      date,
      createdBy: userId
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Table booked successfully!'
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong while booking.' });
  }
};

const handleShowBookings = async (req, res) => {
  const { id } = req.params;

  try {
    const bookings = await Booking.find({ createdBy: id })
      .populate('createdBy') // only include selected fields
      .sort({ createdAt: -1 })             // newest first (optional)
      .lean();                             // optimize for read-only

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ success: false, message: 'No bookings found.' });
    }

    return res.status(200).json({ success: true, bookings });

  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Booking not found." });
    }

    res.status(200).json({ success: true, message: "Status updated successfully." });
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Booking.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Booking not found." });
    }

    res.status(200).json({ success: true, message: "Booking deleted successfully." });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};





module.exports = {
    handleSignUp,
    handleLogin,
    handleBookATable,
    handleShowBookings,
    updateBookingStatus,
    deleteBooking
}