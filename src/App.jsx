import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import "./App.css"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Applications from "./pages/Applications"
import AddJob from "./pages/AddJob"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { AuthProvider } from "./context/AuthContext"
import { ApplicationProvider } from "./context/ApplicationContext"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Router>
      <AuthProvider>
        <ApplicationProvider>
          <div className="app">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <div className="app-container">
                      <Sidebar />
                      <div className="content">
                        <Dashboard />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applications"
                element={
                  <ProtectedRoute>
                    <div className="app-container">
                      <Sidebar />
                      <div className="content">
                        <Applications />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-job"
                element={
                  <ProtectedRoute>
                    <div className="app-container">
                      <Sidebar />
                      <div className="content">
                        <AddJob />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <div className="app-container">
                      <Sidebar />
                      <div className="content">
                        <Profile />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </ApplicationProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
