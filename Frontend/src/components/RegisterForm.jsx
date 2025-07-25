import React, { useState } from "react";
import { registerUser } from "../apis/user.api";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/auth.Slice.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate({ to: "/dashboard" });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser(name, email, password);
      dispatch(login(data.user));
      setLoading(false);

      setTimeout(() => {
        navigate({ to: "/dashboard" });
      }, 500);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-100 backdrop-blur-sm bg-opacity-95"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">
              Create an Account
            </h2>
            <p className="text-gray-600 text-sm">
              Join us today! It's quick and easy.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 animate-shake">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            </div>
          )}

          {/* Full Name */}
          <div className="mb-6 group">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg 
                                       focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                                       transition-all duration-300 transform hover:scale-105 focus:scale-105"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6 group">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg 
                                       focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                                       transition-all duration-300 transform hover:scale-105 focus:scale-105"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6 group">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg 
                                       focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                                       transition-all duration-300 transform hover:scale-105 focus:scale-105"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold py-3 px-4 rounded-lg 
                                       focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 
                                       transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                                       ${
                                         loading
                                           ? "opacity-70 cursor-not-allowed animate-pulse"
                                           : "hover:from-purple-600 hover:to-blue-700 active:scale-95"
                                       }`}
            >
              <div className="flex items-center justify-center">
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {loading ? "Registering..." : "Create Account"}
              </div>
            </button>
          </div>

          {/* Link to Login */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/auth/login">
                <span className="text-purple-500 hover:text-purple-700 font-semibold hover:underline transition-all duration-200">
                  Sign In
                </span>
              </Link>
            </p>
          </div>
        </form>

        {/* CSS Animations */}
        <style>{`
                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-5px); }
                        75% { transform: translateX(5px); }
                    }

                    .animate-fade-in { animation: fade-in 0.6s ease-out; }
                    .animate-shake { animation: shake 0.5s ease-in-out; }
                `}</style>
      </div>
    </div>
  );
};

export default RegistrationForm;
