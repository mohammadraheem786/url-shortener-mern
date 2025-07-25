import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2, ExternalLink } from 'lucide-react'

const fetchUserUrls = async () => {
  const response = await axios.post(
    'http://localhost:5000/api/user/urls',
    {},
    { withCredentials: true }
  )
  return response.data.urls
}

const UserUrl = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userUrls'],
    queryFn: fetchUserUrls,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center mt-10">
        Failed to load URLs. Please log in.
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No URLs found. Create your first custom or shortened URL!
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Shortened URLs</h1>
      <div className="grid gap-4">
        {data.map((url, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="flex flex-col md:flex-row md:justify-between">
              <div>
                <p className="text-sm text-gray-600">Original URL:</p>
                <a
                  href={url.full_url.startsWith('http') ? url.full_url : `https://${url.full_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {url.full_url}
                </a>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-sm text-gray-600">Shortened URL:</p>
                <a
                  href={`http://localhost:5000/${url.short_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 underline flex items-center gap-1"
                >
                  {`http://localhost:5000/${url.short_url}`} <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserUrl
