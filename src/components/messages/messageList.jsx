import { MessageCard } from "./messageCard.jsx";

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
                    />
                )
            })}
        </div>
    )
}