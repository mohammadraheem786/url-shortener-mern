import React from 'react'
import UrlForm from '../components/UrlForm_dashboard.jsx'
import UserUrl from '../components/UserUrl'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const DashboardPage = () => {
  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axios.get('/api/auth/logout', { withCredentials: true })
    },
    onSuccess: () => {
      queryClient.removeQueries(['current-user']) // Clear current user from cache
      window.location.href = '/' // Redirect to homepage
    },
    onError: (error) => {
      console.error('Logout failed:', error.response?.data?.message || error.message)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-4xl mx-auto mt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">🔗 URL Shortener Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md"
          >
            Logout
          </button>
        </div>

        <hr className="my-8 border-gray-300" />

        <UrlForm />
        <UserUrl />
      </div>
    </div>
  )
}

export default DashboardPage
