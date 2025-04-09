"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ApplicationContext = createContext();

export function useApplications() {
  return useContext(ApplicationContext);
}

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  // Fetch all applications from the backend
  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/applications/get-all-applications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch applications");
      }

      const data = await response.json();
      setApplications(data.data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new application
  const addApplication = async (applicationData) => {
    try {
      const response = await fetch("http://localhost:8000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
        credentials: 'include'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add application");
      }

      const newApplication = await response.json();
      setApplications((prev) => [...prev, newApplication.data]);
      return newApplication.data;
    } catch (error) {
      console.error("Error adding application:", error);
      throw error;
    }
  };

  // Update an existing application
  const updateApplication = async (id, applicationData) => {
    try {
      const response = await fetch(`http://localhost:8000/api/applications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
        credentials: 'include'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update application");
      }

      const updatedApplication = await response.json();
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? updatedApplication.data : app))
      );
      return updatedApplication.data;
    } catch (error) {
      console.error("Error updating application:", error);
      throw error;
    }
  };

  // Delete an application
  const deleteApplication = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/applications/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete application");
      }

      setApplications((prev) => prev.filter((app) => app._id !== id));
      return true;
    } catch (error) {
      console.error("Error deleting application:", error);
      throw error;
    }
  };

  const value = {
    applications,
    loading,
    addApplication,
    updateApplication,
    deleteApplication,
    fetchApplications,
  };

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
}
