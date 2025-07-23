import React, { useState, useEffect } from "react";
import backgroundImg from "../assets/background.jpg";
import { createShortUrl } from "../apis/shortUrl.api";

const UrlForm = ({ onUrlAdded }) => {
  const [inputUrl, setInputUrl] = useState("");
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [shortUrl, setShortUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [copied, setCopied] = useState(false);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortUrl(null);
    setError("");
    setLoading(true);

    try {
      const data = await createShortUrl(inputUrl);
      setShortUrl(data.shortUrl || data);
      setInputUrl("");
      if (onUrlAdded) onUrlAdded();
    } catch {
      setError("An error occurred while shortening the URL.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    }
  };

  const handleFollowLink = () => {
    if (shortUrl) window.open(shortUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto p-6 rounded-2xl overflow-hidden bg-white shadow-xl backdrop-blur-md bg-opacity-90">
      {/* Mouse glow animation */}
      <div
        className="absolute w-8 h-8 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full pointer-events-none animate-ping z-10"
        style={{
          left: cursorPos.x - 16,
          top: cursorPos.y - 16,
          opacity: 0.3,
          transition: "all 0.1s ease-in-out",
        }}
      />

      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 animate-pulse">
        🔗 Shorten Your URL
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-center text-gray-700">Paste the URL to be shortened</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter the link here"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            disabled={loading || !inputUrl}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </div>
      </form>

      {/* Error */}
      {error && <p className="text-center mt-3 text-red-500">{error}</p>}

      {/* Shortened URL */}
      {shortUrl && (
        <div className="mt-6 text-center space-y-2 animate-fade-in-up">
          <p className="text-lg font-semibold text-gray-800">🎉 Your Shortened URL:</p>
          <div className="flex items-center justify-center gap-2">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                readOnly
                value={shortUrl}
                onClick={handleFollowLink}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="px-4 py-2 rounded-md border border-gray-300 w-full text-center bg-gray-100 text-blue-600 font-medium cursor-pointer underline"
                title="Click to follow this link"
              />
              {isHovering && (
                <div className="absolute left-1/2 -translate-x-1/2 -top-8 bg-blue-600 text-white px-3 py-1 rounded shadow text-xs z-10">
                  Click to open the shortened URL
                </div>
              )}
            </div>
            <button
              className={`px-4 py-2 rounded-md text-white transition-all ${
                copied ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {/* Promo Section */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl shadow animate-fade-in">
        <p className="text-gray-800 font-medium text-center">Want More? Try Premium Features!</p>
        <p className="text-gray-600 text-center mt-2">
          Custom links, analytics, dashboard, QR codes, and more.
        </p>
        <button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
          🚀 Create Account
        </button>
      </div>

      {/* Footer Note */}
      <p className="text-center text-gray-500 text-xs mt-6 animate-fade-in-up">
        Shorten links for platforms like Instagram, YouTube, Twitter, and more!
      </p>
    </div>
  );
};

export default UrlForm;
