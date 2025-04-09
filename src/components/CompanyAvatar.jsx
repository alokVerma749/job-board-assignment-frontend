function CompanyAvatar({ name }) {
  const getInitial = () => {
    return name ? name.charAt(0).toUpperCase() : "A"
  }

  const getAvatarClass = () => {
    const initial = getInitial()
    switch (initial) {
      case "G":
        return "avatar avatar-g"
      case "A":
        return "avatar avatar-a"
      case "M":
        return "avatar avatar-m"
      case "N":
        return "avatar avatar-n"
      case "S":
      case "T":
      case "D":
        return "avatar avatar-s"
      default:
        return "avatar bg-gray-200 text-gray-700"
    }
  }

  return <div className={getAvatarClass()}>{getInitial()}</div>
}

export default CompanyAvatar
