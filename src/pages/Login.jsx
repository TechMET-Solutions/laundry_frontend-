// import React, { useState } from "react";
// import login_image from "../assets/login_image.png";
// import login2 from "../assets/login2.png";
// import login3 from "../assets/login3.png";
// import logo from "../assets/logo.png";
// import { MdVisibility, MdVisibilityOff } from "react-icons/md";
// import axios from "axios";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";

// import { API_URL } from "../api";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Please enter email and password");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     try {
//       const response = await axios.post(`${API_URL}/api/auth/login`, {
//         email,
//         password,
//       });

//       if (response.data?.success) {
//         const { token, user } = response.data;

//         // Save to AuthContext + localStorage
//         login(user, token);

//         // Redirect to dashboard
//         navigate("/dashboard");
//       } else {
//         setError(response.data?.message || "Login failed");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid email or password");
//       console.error("Login error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row bg-[#F3F6FA] min-h-screen md:p-12 gap-4">
//       {/* LEFT SIDE */}
//       <div className="bg-[#56CCF280] p-8 w-full md:w-3/5 flex flex-col items-center justify-center rounded-2xl">
//         <Swiper
//           spaceBetween={30}
//           centeredSlides
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           pagination={{ clickable: true }}
//           modules={[Autoplay, Pagination]}
//           className="w-full max-w-md h-72"
//         >
//           {[login_image, login2, login3].map((img, i) => (
//             <SwiperSlide key={i}>
//               <img
//                 src={img}
//                 alt={`Slide ${i + 1}`}
//                 className="w-full h-full object-cover rounded-xl"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         <div className="mt-6 text-center px-4">
//           <h3 className="text-xl font-semibold">
//             Manage Your Laundry Effortlessly
//           </h3>
//           <p className="mt-2 text-gray-700 text-sm">
//             Create orders, track pickups, and update delivery status — all in
//             one place.
//           </p>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="bg-white p-8 w-full md:w-2/5 flex items-center justify-center rounded-2xl shadow-lg">
//         <div className="max-w-md w-full">
//           <div className="mb-6 flex justify-center">
//             <img src={logo} alt="Logo" className="h-10 w-auto" />
//           </div>

//           <h2 className="text-2xl font-bold mb-6 text-left">
//             Login to Continue
//           </h2>

//           <form onSubmit={handleLogin} className="space-y-4">
//             {/* Email */}
//             <div>
//               <label className="block text-gray-700 text-sm font-semibold mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-gray-700 text-sm font-semibold mb-1">
//                 Password
//               </label>

//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your password"
//                   required
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute right-3 top-2 text-gray-600 hover:text-gray-800"
//                 >
//                   {showPassword ? (
//                     <MdVisibility size={20} />
//                   ) : (
//                     <MdVisibilityOff size={20} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
//                 {error}
//               </div>
//             )}

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#00A8A2] text-white py-2 rounded-full hover:bg-[#008b86] transition disabled:opacity-50"
//             >
//               {loading ? "Signing In..." : "Sign In"}
//             </button>
//           </form>

//           {/* Footer */}
//           <div className="flex items-center mt-4 text-sm">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" className="h-4 w-4" />
//               Remember Me
//             </label>

//             <button
//               className="ml-auto text-blue-600 hover:underline"
//               type="button"
//             >
//               Forgot Password?
//             </button>
//           </div>

//           <p className="mt-6 text-center text-xs text-gray-500">
//             By continuing, you agree to the Terms of Use and Privacy Policy.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import login_image from "../assets/login_image.png";
import login2 from "../assets/login2.png";
import login3 from "../assets/login3.png";
import logo from "../assets/logo.png";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { API_URL } from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data?.success) {
        // Extract token and employee from your specific API structure
        const { token, employee } = response.data;

        if (token && employee) {
          // Pass the employee data as the "user" to your AuthContext
          login(employee, token);
          navigate("/dashboard");
        } else {
          setError("UserData (employee) is missing from the server response.");
        }
      } else {
        setError(response.data?.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#F3F6FA] min-h-screen md:p-12 gap-4">
      {/* LEFT SIDE */}
      <div className="bg-[#56CCF280] p-8 w-full md:w-3/5 flex flex-col items-center justify-center rounded-2xl">
        <Swiper
          spaceBetween={30}
          centeredSlides
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="w-full max-w-md h-72"
        >
          {[login_image, login2, login3].map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-6 text-center px-4">
          <h3 className="text-xl font-semibold">
            Manage Your Laundry Effortlessly
          </h3>
          <p className="mt-2 text-gray-700 text-sm">
            Create orders, track pickups, and update delivery status — all in
            one place.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-white p-8 w-full md:w-2/5 flex items-center justify-center rounded-2xl shadow-lg">
        <div className="max-w-md w-full">
          <div className="mb-6 flex justify-center">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>

          <h2 className="text-2xl font-bold mb-6 text-left">
            Login to Continue
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2 text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? (
                    <MdVisibility size={20} />
                  ) : (
                    <MdVisibilityOff size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00A8A2] text-white py-2 rounded-full hover:bg-[#008b86] transition disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="flex items-center mt-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              Remember Me
            </label>

            <button
              className="ml-auto text-blue-600 hover:underline"
              type="button"
            >
              Forgot Password?
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            By continuing, you agree to the Terms of Use and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
