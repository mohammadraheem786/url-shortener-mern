import React, { useState, useEffect } from 'react';
import { loginUser } from '../apis/user.api.js';
import { useNavigate } from '@tanstack/react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/auth.Slice.js';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate({ to: '/dashboard' });
    }
  }, [auth.isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(email, password); // Should return { user: {...} }
      dispatch(login(data.user));
      navigate({ to: '/dashboard' });
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-100 backdrop-blur-sm bg-opacity-95"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-sm">Please sign in to your account</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 animate-shake">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
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

          <div className="mb-6 group">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2 group-focus-within:text-blue-600"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg 
                           focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 -z-10 blur transition-opacity duration-300 group-focus-within:opacity-20" />
            </div>
          </div>

          <div className="mb-6 group">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2 group-focus-within:text-blue-600"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg 
                           focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 -z-10 blur transition-opacity duration-300 group-focus-within:opacity-20" />
            </div>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg 
                          focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 
                          transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl
                          ${loading ? 'opacity-70 cursor-not-allowed animate-pulse' : 'hover:from-blue-600 hover:to-purple-700 active:scale-95'}`}
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                {loading ? 'Signing in...' : 'Sign In'}
              </div>
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <a
                href="/auth/signup"
                className="text-blue-500 hover:text-blue-700 cursor-pointer font-semibold 
                           transition-colors duration-200 hover:underline transform hover:scale-105 inline-block"
              >
                Create Account
              </a>
            </p>
          </div>
        </form>

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

          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }

          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default LoginForm;
