// Import required libraries
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");  // Import CORS
const { check, validationResult } = require("express-validator"); // Input validation
require("dotenv").config(); // Load environment variables

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Secret key for JWT
const SECRET_KEY = process.env.SECRET_KEY; // Fetch secret key from .env

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// User Schema and Model
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model("User", userSchema);

// Routes

// Register a new user
app.post("/register", 
    // Validate email format and password length
    [
        check("email").isEmail().withMessage("Please provide a valid email."),
        check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long.")
    ], 
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;

            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists." });
            }

            // Create and save the new user
            const user = new User({ email, password });
            await user.save();

            res.status(201).json({ message: "User registered successfully!" });
        } catch (err) {
            res.status(500).json({ message: "Error registering user", error: err.message });
        }
    }
);

// Login an existing user
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful!", token });
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
});

// Protected Route Example
app.get("/protected", async (req, res) => {
    try {
        const token = req.headers["authorization"];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }

        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        res.status(200).json({ message: "Protected route accessed.", user: decoded });
    } catch (err) {
        res.status(401).json({ message: "Unauthorized: Invalid token." });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
