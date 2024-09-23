// // src/components/Login.js

// import { useState } from "react";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5000/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", response.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Invalid email or password");
//     }
//   };

//   const handleGoogleLoginSuccess = async (credentialResponse) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/auth/google-login",
//         {
//           token: credentialResponse.credential,
//         }
//       );

//       localStorage.setItem("token", response.data.token);
//       navigate("/dashboard");
//     } catch (error) {
//       console.log("Google sign-in failed");
//     }
//   };

//   const handleGoogleLoginFailure = (error) => {
//     console.log("Google sign-in error:", error);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Left half - login form */}
//       <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 p-8">
//         <h2 className="text-4xl font-bold mb-4">WELCOME BACK</h2>
//         <p className="text-sm text-gray-500 mb-6">
//           Welcome back! Please enter your details.
//         </p>

//         <form onSubmit={handleLogin} className="w-full max-w-md">
//           {error && <p className="text-red-500 mb-4">{error}</p>}

//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="w-full p-3 border rounded"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="w-full p-3 border rounded"
//               placeholder="********"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <input type="checkbox" id="remember" />
//               <label htmlFor="remember" className="ml-2 text-sm">
//                 Remember me
//               </label>
//             </div>
//             <a href="#" className="text-sm text-red-500">
//               Forgot password
//             </a>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600 mb-4"
//           >
//             Sign in
//           </button>

//           <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
//             <GoogleLogin
//               onSuccess={handleGoogleLoginSuccess}
//               onError={handleGoogleLoginFailure}
//             />
//           </GoogleOAuthProvider>

//           <div className="mt-6 text-center">
//             <span className="text-sm">Don’t have an account? </span>
//             <a href="#" className="text-sm text-red-500">
//               Sign up for free!
//             </a>
//           </div>
//         </form>
//       </div>

//       {/* Right half - image */}
//       <div
//         className="w-1/2 bg-cover bg-center"
//         style={{ backgroundImage: "url('/path/to/your/image.png')" }}
//       >
//         {/* Add your image here */}
//       </div>
//     </div>
//   );
// };

// export default Login;

// frontend/src/pages/Login.js
import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

const Login = () => {
  const handleSuccess = async (response) => {
    const { tokenId } = response;

    try {
      // Send Google token to the backend
      const res = await axios.post("http://localhost:5000/auth/google-login", {
        token: tokenId,
      });

      // Save JWT token to local storage
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");
    } catch (error) {
      console.error("Google login failed", error);
      alert("Login failed");
    }
  };

  const handleFailure = (error) => {
    console.error("Google login error", error);
    alert("Google login failed");
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Sign in with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Login;
