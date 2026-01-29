import { MessageCard } from "./MessageCard.jsx";

export const MessageList = ({ messages, onLike, onDelete }) => {
    return (
        <>
            {messages.map((message) => {
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
                    />
                )
            })}
        </>
    )
}
