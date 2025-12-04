export const Time = ({ createdAt }) => {
    const formatTimeAgo = (timestamp) => {
        const now = Date.now()
        const seconds = Math.floor((now - timestamp) / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        if (seconds < 60) {
            return `${seconds} seconds ago`
        } else if (minutes < 60) {
            return `${minutes} minutes ago`
        } else if (hours < 24) {
            return `${hours} hours ago`
        } else {
            return `${days} days ago`
        }
    }

    return (
        <span>{formatTimeAgo(createdAt)}</span>
    )
}