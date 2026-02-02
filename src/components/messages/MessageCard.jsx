import styled, { keyframes} from "styled-components";
import { LikeButton } from "./LikeButton.jsx";
import { HappyText } from "./MessageText.jsx";
import { Time } from "./Time.jsx";

export const MessageCard = ({ id, text, hearts, onLike, onDelete, liked, createdAt, isNew }) => {
    return (
        <CardWrapper $isNew={isNew}>
            <MessageSection>
                <HappyText text={text}/>
                <LikeButtonWrapper>
                    <LikeButton 
                        hearts={hearts}
                        onLike={() => onLike(id)}
                        liked={liked}
                    />
                    <StyledDiv>
                        <Time createdAt={createdAt}/>
                        <DeleteBtn
                            type="button"
                            onClick={() => onDelete(id)}
                            aria-label="Delete message"
                            title="Delete"
                        >🗑️</DeleteBtn>
                    </StyledDiv>
                </LikeButtonWrapper>
            </MessageSection>
        </CardWrapper>
    )
}

const MessageSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 30px;
    gap: 20px;
    border: 2px solid ${({ theme }) => theme.colors.border };
    height: auto;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.cardBackground };
    box-shadow: 7px 7px ${({ theme }) => theme.colors.border };
    `

const LikeButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`
const DeleteBtn = styled.button`
    background-color: ${({ theme }) => theme.colors.formBackground  };
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    font-size: 20px;
    transition: background-color 0.3s ease;

    &:hover {
    background-color: ${({ theme }) => theme.colors.deleteBtn};
    }
`

const popIn = keyframes`
    from {
    opacity: 0;
    transform: translateY(16px) scale(0.8);
    filter: blur(4px);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
    }
`
const CardWrapper = styled.div`
    animation: ${({ $isNew }) => ($isNew ? popIn : "none")} 700ms ease;
`