"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Register() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState("")
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      return setError("Passwords do not match")
    }

    if (!agreeTerms) {
      return setError("You must agree to the Terms of Service")
    }

    try {
      const success = register(email, password)
      if (success) {
        navigate("/")
      }
    } catch (error) {
      setError("Failed to create an account")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div
        className="w-full md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=800&width=800')" }}
      >
        <div className="h-full w-full bg-black bg-opacity-50 flex flex-col justify-center p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Start Your Career Journey</h2>
          <p className="text-xl mb-8">Track applications and land your dream job with our powerful tools</p>
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
          <div className="mt-auto text-sm">Photo by Austin Distel</div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <div className="mb-4">
            <Link to="/login" className="text-blue-500 hover:text-blue-700 flex items-center">
              ← Back to Login
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-gray-600 mb-8">Track your job applications in one place</p>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 border rounded"
                  placeholder="John"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 border rounded"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded"
                placeholder="••••••••"
                required
              />
              <p className="text-sm text-gray-600 mt-1">Password must be at least 8 characters long</p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border rounded"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-8">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
