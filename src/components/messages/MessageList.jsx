import { MessageCard } from "./MessageCard.jsx";

export const MessageList = ({ messages, onLike, onDelete, newPostId, currentUserId }) => {
    return (
        <>
            {messages.map((message) => {
                const isOwner = currentUserId && message.userId?.toString() === currentUserId
                
                return (
                    <MessageCard
                        key={message._id}
                        id={message._id}
                        text={message.message}
                        hearts={message.hearts}
                        createdAt={message.createdAt}
                        onLike={onLike}
                        onDelete={onDelete}
                        liked={message.hearts > 0}
                        isNew={message._id === newPostId}
                        canDelete={isOwner}
                    />
                )
            })}
        </>
    )
}
