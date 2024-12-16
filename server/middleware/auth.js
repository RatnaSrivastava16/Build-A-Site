// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const auth = (req, res, next) => {
//   try {
//     const token = req.headers['authorization'];

//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized: No token provided.' });
//     }

//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
//   }
// };

// module.exports = auth;
