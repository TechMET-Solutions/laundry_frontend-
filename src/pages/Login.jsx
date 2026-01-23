import React, { useState } from 'react'
import login_image from '../assets/login_image.png'
import login2 from '../assets/login2.png'
import login3 from '../assets/login3.png'
import logo from '../assets/logo.png'
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom'
import {loginUser} from '../api/user';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await loginUser({ email, password });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <style>{`
        .mySwiper {
          width: 100%;
          max-width: 420px;
          height: 320px;
        }

        .mySwiper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>

      <div className="flex flex-col md:flex-row bg-[#F3F6FA] min-h-screen p-0 md:p-20 gap-4">

        {/* LEFT SECTION (same styling as old) */}
        <div className="bg-[#56CCF280] p-8 w-full md:w-3/5 flex flex-col items-center justify-center rounded-lg">

          <Swiper
            spaceBetween={30}
            centeredSlides
            autoplay={{ delay: 3000, disableOnInteraction: false }}
             pagination={{ clickable: true }}
            //  navigation
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {[login_image, login2, login3].map((img, i) => (
              <SwiperSlide key={i}>
                <img src={img} alt={`Slide ${i + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold">
              Manage Your Laundry Effortlessly
            </h3>
            <p className="mt-2 text-gray-700">
              Create orders, track pickups, and update delivery status — all in one place.
            </p>
          </div>
        </div>

        {/* RIGHT SECTION (exact same spacing & styling) */}
        <div className="bg-white p-8 w-full md:w-2/5 flex items-center justify-center">
          <div className="max-w-md w-full">

            <div className="mb-6 flex justify-center pb-8">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
            </div>

            <h2 className="text-2xl font-bold mb-6 text-left">
              Login to Continue
            </h2>

            <form>
              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-gray-600 cursor-pointer hover:text-gray-800"
                  >
                    {showPassword ? <MdVisibility size={20} /> : <MdVisibilityOff size={20} />}
                  </button>
                </div>
              </div>

              {/* Button */}
              <Link to="/dashboard"
                className="w-full bg-[#00A8A280] text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              > <button
                type="submit"
                onClick={() => handleLogin(formData.e)}

              >Sign In</button>
                
              </Link>
            </form>

            {/* Remember + Forgot */}
            <div className="flex items-center mt-4">
              <input type="checkbox" className="mr-2 h-4 w-4" />
              <p className="text-sm text-gray-700">Remember Me</p>

              <a href="#" className="ml-auto text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              By continuing, you agree to the Terms of use and Privacy Policy.
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default Login
