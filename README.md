
# 🔗 URL Shortener App (MERN Stack)

A full-stack web application that allows users to shorten long URLs into sleek, shareable links — built using the MERN stack (MongoDB, Express.js, React, Node.js).

---

## 🚀 Live Demo

Frontend: [https://yourfrontend.netlify.app](https://yourfrontend.netlify.app)  
Backend API: [https://yourbackend.onrender.com](https://yourbackend.onrender.com)

---

## 🛠️ Tech Stack

- ⚛️ **Frontend:** React.js, Tailwind CSS
- 🧠 **Backend:** Node.js, Express.js
- 💾 **Database:** MongoDB (MongoDB Atlas)
- 🔐 **Security:** CORS, Helmet
- ☁️ **Deployment:** Netlify (frontend), Render (backend)

---

## 📸 Preview

![App Preview](https://i.imgur.com/sample.gif)

---

## 🔧 Features

- ✅ Shorten any valid URL instantly
- ✅ Custom loading cursor animation
- ✅ Copy shortened URLs with one click
- ✅ Error handling for invalid URLs
- ✅ MongoDB-based storage of original & short links

---

## 🧩 Project Structure

```
url-shortener-mern/
├── client/               # React frontend
│   ├── components/
│   └── pages/
├── server/               # Node + Express backend
│   ├── routes/
│   └── controllers/
└── README.md
```

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/mohammadraheem786/url-shortener-mern.git
cd url-shortener-mern
```

### 2. Setup the backend

```bash
cd server
npm install
touch .env
```

Add the following to `.env`:

```
MONGO_URI=your_mongo_db_uri
PORT=5000
BASE_URL=https://yourbackend.onrender.com
```

```bash
npm start
```

### 3. Setup the frontend

```bash
cd ../client
npm install
npm run dev
```

---

## 🤝 Contributions

Feel free to fork the repo and submit a pull request — improvements are welcome!

---

## 📬 Contact

🔹 **Author:** Mohammad Raheem  
🔹 **LinkedIn:** [linkedin.com/in/mohammad-raheem-400783294](https://linkedin.com/in/mohammad-raheem-400783294)  
🔹 **Email:** mohammadraheem359@gmail.com  

---

## ⭐ Give a Star

If you liked this project, consider giving it a ⭐ to support the work!

---
