"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { mockApplications } from "../data/mockData"

const ApplicationContext = createContext()

export function useApplications() {
  return useContext(ApplicationContext)
}

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch applications
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Get applications from localStorage or use mock data
      const storedApplications = localStorage.getItem("applications")
      if (storedApplications) {
        setApplications(JSON.parse(storedApplications))
      } else {
        setApplications(mockApplications)
        localStorage.setItem("applications", JSON.stringify(mockApplications))
      }

      setLoading(false)
    } catch (error) {
      console.error("Error fetching applications:", error)
      setLoading(false)
    }
  }

  const addApplication = async (applicationData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      const newApplication = {
        id: Date.now().toString(),
        ...applicationData,
        createdAt: new Date().toISOString(),
      }

      const updatedApplications = [...applications, newApplication]
      setApplications(updatedApplications)
      localStorage.setItem("applications", JSON.stringify(updatedApplications))

      return newApplication
    } catch (error) {
      console.error("Error adding application:", error)
      throw error
    }
  }

  const updateApplication = async (id, applicationData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      const updatedApplications = applications.map((app) =>
        app.id === id ? { ...app, ...applicationData, updatedAt: new Date().toISOString() } : app,
      )

      setApplications(updatedApplications)
      localStorage.setItem("applications", JSON.stringify(updatedApplications))

      return updatedApplications.find((app) => app.id === id)
    } catch (error) {
      console.error("Error updating application:", error)
      throw error
    }
  }

  const deleteApplication = async (id) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      const updatedApplications = applications.filter((app) => app.id !== id)
      setApplications(updatedApplications)
      localStorage.setItem("applications", JSON.stringify(updatedApplications))

      return true
    } catch (error) {
      console.error("Error deleting application:", error)
      throw error
    }
  }

  const value = {
    applications,
    loading,
    addApplication,
    updateApplication,
    deleteApplication,
    fetchApplications,
  }

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>
}
