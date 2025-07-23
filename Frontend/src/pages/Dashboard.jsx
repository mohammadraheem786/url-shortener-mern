import React from 'react'
import UrlForm from '../components/Url_form'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">🔗 URL Shortener Dashboard</h1>
        <UrlForm />
        <hr className="my-8 border-gray-300" />
        <UserUrl />
      </div>
    </div>
  )
}

export default DashboardPage
