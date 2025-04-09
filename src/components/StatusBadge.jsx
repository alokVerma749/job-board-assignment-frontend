function StatusBadge({ status }) {
  const getStatusClass = () => {
    switch (status.toLowerCase()) {
      case "applied":
        return "status-badge status-applied"
      case "interview":
        return "status-badge status-interview"
      case "offer":
      case "accepted":
        return "status-badge status-offer"
      case "rejected":
        return "status-badge status-rejected"
      default:
        return "status-badge bg-gray-200 text-gray-800"
    }
  }

  return <span className={getStatusClass()}>{status}</span>
}

export default StatusBadge
