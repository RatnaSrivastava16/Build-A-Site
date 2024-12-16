// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Import User model

// // User Registration
// router.post('/register', async (req, res) => {
//     try {
//         console.log('Incoming request body:', req.body); // req is defined here

//         const { email, password } = req.body;

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         const user = new User({ email, password: hashedPassword });
//         await user.save();

//         return res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         return res.status(500).json({ message: 'Error registering user', error: error.message });
//     }
// });

// // User Login
// router.post('/login', async (req, res) => {
//     try {
//         console.log('Login request body:', req.body);

//         const { email, password } = req.body;

//         // Check if user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         // Compare passwords
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, {
//             expiresIn: '1h',
//         });

//         return res.status(200).json({ message: 'Login successful', token });
//     } catch (error) {
//         return res.status(500).json({ message: 'Error logging in', error: error.message });
//     }
// });

// module.exports = router;
