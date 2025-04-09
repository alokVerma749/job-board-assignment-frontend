"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    try {
      const success = login(email, password)
      if (success) {
        navigate("/")
      }
    } catch (error) {
      setError("Failed to log in")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div
        className="w-full md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=800&width=800')" }}
      >
        <div className="h-full w-full bg-black bg-opacity-50 flex flex-col justify-center p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Track Your Job Journey</h2>
          <p className="text-xl mb-8">Organize applications, monitor progress, and land your dream job</p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center mr-3">✓</div>
              <p>Organize applications efficiently</p>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center mr-3">✓</div>
              <p>Track application status easily</p>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center mr-3">✓</div>
              <p>Get insights on your job search</p>
            </div>
          </div>
          <div className="mt-auto text-sm">Photo by Glenn Carstens-Peters</div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2">Student Job Tracker</h1>
          <p className="text-gray-600 mb-8">Sign in to access your applications</p>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded"
                placeholder="••••••••"
                required
              />
              <div className="text-right mt-1">
                <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-8">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:text-blue-700">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
