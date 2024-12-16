// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// // User Schema
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     try {
//       this.password = await bcrypt.hash(this.password, 10);
//     } catch (err) {
//       next(err);
//     }
//   }
//   next();
// });

// module.exports = mongoose.model('User', userSchema);
