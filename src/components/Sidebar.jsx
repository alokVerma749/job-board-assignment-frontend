"use client"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Sidebar() {
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-700" : ""
  }

  const getInitials = (email) => {
    return email.substring(0, 2).toUpperCase()
  }

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Student Job Tracker</h1>
      </div>
      <nav className="flex-1">
        <ul className="py-4">
          <li>
            <Link to="/" className={`flex items-center px-4 py-3 hover:bg-gray-700 ${isActive("/")}`}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/applications"
              className={`flex items-center px-4 py-3 hover:bg-gray-700 ${isActive("/applications")}`}
            >
              Applications
            </Link>
          </li>
          <li>
            <Link to="/add-job" className={`flex items-center px-4 py-3 hover:bg-gray-700 ${isActive("/add-job")}`}>
              Add Job
            </Link>
          </li>
          <li>
            <Link to="/profile" className={`flex items-center px-4 py-3 hover:bg-gray-700 ${isActive("/profile")}`}>
              Profile
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700 mt-auto">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
            <span className="text-white font-bold">{user ? getInitials(user.email) : "JS"}</span>
          </div>
          <div className="flex-1">
            <div className="text-sm">{user ? user.email : "student@example.com"}</div>
            <button onClick={logout} className="text-xs text-red-400 hover:text-red-300">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
