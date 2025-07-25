import React from 'react'
import UrlForm from '../components/Url_form.jsx'

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-purple-100 flex items-center justify-center px-4 overflow-hidden">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-xl transition-transform duration-300 hover:scale-105">
        

        <UrlForm />

        
      </div>
    </div>
  )
}

export default HomePage
