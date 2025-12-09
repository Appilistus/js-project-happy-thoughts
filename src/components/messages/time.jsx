import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const Time = ({ createdAt }) => {
    return (
        <span>{dayjs(createdAt).fromNow()}</span>
    )
}