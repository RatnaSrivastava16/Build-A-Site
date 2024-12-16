// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   // State for email, password and JWT token
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [token, setToken] = useState('');

//   // Register user function
//   const registerUser = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/register', {
//         email,
//         password,
//       });
//       console.log(response.data.message); // "User registered successfully!"
//     } catch (error) {
//       console.error('Error registering user:', error.response.data.message); // Show error message
//     }
//   };

//   // Login user function
//   const loginUser = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/login', {
//         email,
//         password,
//       });
//       console.log(response.data.message); // "Login successful!"
//       setToken(response.data.token); // Save the token in the state
//     } catch (error) {
//       console.error('Error logging in:', error.response.data.message); // Show error message
//     }
//   };

//   // Access protected route
//   const accessProtectedRoute = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/protected', {
//         headers: {
//           Authorization: token, // Send JWT token in Authorization header
//         },
//       });
//       console.log(response.data.message); // "Protected route accessed."
//     } catch (error) {
//       console.error('Error accessing protected route:', error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <h1>User Authentication</h1>
//       <div>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={registerUser}>Register</button>
//         <button onClick={loginUser}>Login</button>
//       </div>
//       {token && (
//         <div>
//           <button onClick={accessProtectedRoute}>Access Protected Route</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
