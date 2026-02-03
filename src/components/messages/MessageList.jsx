import { MessageCard } from "./MessageCard.jsx";

export const MessageList = ({ messages, onLike, onDelete, currentUserId, isLoggedIn, newPostId}) => {
    return (
        <>
            {messages.map((message) => {
                const messageUserId = message.userId?.toString?.()
                const canDelete = isLoggedIn && messageUserId === currentUserId;

                return (
                    <MessageCard
                        key={message._id}
                        id={message._id}
                        text={message.message}
                        hearts={message.hearts}
                        createdAt={message.createdAt}
                        userId={message.userId}
                        onLike={onLike}
                        onDelete={onDelete}
                        liked={message.hearts > 0}
                        isNew={message._id === newPostId}
                        canDelete={canDelete}
                    />
                )
            })}
        </>
    )
}
