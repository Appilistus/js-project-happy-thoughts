import styled from "styled-components";
import { LikeButton } from "./LikeButton.jsx";
import { HappyText } from "./MessageText.jsx";
import { Time } from "./Time.jsx";

export const MessageCard = ({ id, text, hearts, onLike, liked, createdAt }) => {
    return (
        <MessageSection>
            <HappyText text={text}/>
            <LikeButtonWrapper>
                <LikeButton 
                    hearts={hearts}
                    onLike={() => onLike(id)}
                    liked={liked}
                />

                <Time createdAt={createdAt}/>
            </LikeButtonWrapper>
        </MessageSection>
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