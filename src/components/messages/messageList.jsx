import { MessageCard } from "./MessageCard.jsx";

export const MessageList = ({ messages, onLike }) => {
    return (
        <div>
            {messages.map((message, index) => {
                return (
                    <MessageCard
                        key={index}
                        id={index}
                        text={message.text}
                        hearts={message.hearts}
                        createdAt={message.createdAt}
                        onLike={onLike}
                        liked={message.hearts > 0}
                    />
                )
            })}
        </div>
    )
}