import React, { useState } from 'react';
import { registerUser } from '../apis/User.auth';



const RegistrationForm = ({ state }) => {
    // State for the new name field
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        // Basic validation for all fields
        if (!name || !email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            // Call the registration API function
            const data = await registerUser (name, email, password);
            setLoading(false);
            setSuccess(true);
            console.log("Signup success", data);
            
            // Show success message briefly before potential redirect or state change
            setTimeout(() => {
                // Here you could automatically switch to the login form
                // state(true); 
            }, 2000);
            
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
            <div className="w-full max-w-md transform transition-all duration-300 hover:scale-105">
            <form 
                onSubmit={handleSubmit}
                className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-100 backdrop-blur-sm bg-opacity-95"
            >
                {/* Header with animation */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">
                        Create an Account
                    </h2>
                    <p className="text-gray-600 text-sm">Join us today! It's quick and easy.</p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg border border-green-200 animate-slide-down">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Registration successful! You can now sign in.
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 animate-shake">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    </div>
                )}

                {/* Name Field */}
                <div className="mb-6 group">
                    <label className="block text-gray-700 text-sm font-semibold mb-2 transition-colors group-focus-within:text-purple-600" htmlFor="name">
                        Full Name
                    </label>
                    <div className="relative">
                        <input
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg 
                                       focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                                       transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105"
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-blue-500 opacity-0 -z-10 blur transition-opacity duration-300 group-focus-within:opacity-20"></div>
                    </div>
                </div>

                {/* Email Field */}
                <div className="mb-6 group">
                    <label className="block text-gray-700 text-sm font-semibold mb-2 transition-colors group-focus-within:text-purple-600" htmlFor="email">
                        Email Address
                    </label>
                    <div className="relative">
                        <input
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg 
                                       focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                                       transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-blue-500 opacity-0 -z-10 blur transition-opacity duration-300 group-focus-within:opacity-20"></div>
                    </div>
                </div>

                {/* Password Field */}
                <div className="mb-6 group">
                    <label className="block text-gray-700 text-sm font-semibold mb-2 transition-colors group-focus-within:text-purple-600" htmlFor="password">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg 
                                       focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                                       transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105"
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-blue-500 opacity-0 -z-10 blur transition-opacity duration-300 group-focus-within:opacity-20"></div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mb-6">
                    <button
                        className={`w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold py-3 px-4 rounded-lg 
                                   focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 
                                   transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl
                                   ${loading ? 'opacity-70 cursor-not-allowed animate-pulse' : 'hover:from-purple-600 hover:to-blue-700 active:scale-95'}`}
                        type="submit"
                        disabled={loading}
                    >
                        <div className="flex items-center justify-center">
                            {loading && (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {loading ? 'Registering...' : 'Create Account'}
                        </div>
                    </button>
                </div>

                {/* Login Link */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <span 
                            onClick={() => state(true)} 
                            className="text-purple-500 hover:text-purple-700 cursor-pointer font-semibold 
                                       transition-colors duration-200 hover:underline transform hover:scale-105 inline-block"
                        >
                            Sign In
                        </span>
                    </p>
                </div>
            </form>

            {/* Re-using the same animation styles */}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-10px); }
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
                
                .animate-slide-down {
                    animation: slide-down 0.3s ease-out;
                }
                
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
            </div>
        </div>
    );
};

export default RegistrationForm;
