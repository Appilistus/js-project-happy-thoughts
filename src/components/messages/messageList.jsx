import { MessageCard } from "./MessageCard.jsx";

export const MessageList = ({ messages, onLike }) => {
    return (
        <div>
            {messages.map((message) => {
                return (
                    <MessageCard
                        key={message._id}
                        id={message._id}
                        text={message.message}
                        hearts={message.hearts}
                        createdAt={message.createdAt}
                        onLike={() => onLike(message._id)}
                        liked={message.hearts > 0}
                    />
                )
            })}
        </div>
    )
}