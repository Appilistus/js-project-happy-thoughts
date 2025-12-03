import styled from "styled-components";
import { LikeButton } from "./likeButton.jsx";
import { HappyText } from "./messageText.jsx";
import { Time } from "./time.jsx";

export const MessageCard = () => {
    return (
        <MessageSection>
            <StyledLikeCard>
                <HappyText />
                <LikeButtonWrapper>
                    <LikeButton />

                    <Time />
                </LikeButtonWrapper>
            </StyledLikeCard>
        </MessageSection>
    )
}

const MessageSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
`

const StyledLikeCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    border: 2px solid ${({ theme }) => theme.colors.border };
    width: 50%;
    height: auto;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.cardBackground };
    box-shadow: 7px 7px #1a1a1a;

    @media ${({ theme }) => theme.breakpoints.mobile} {
        width: 90%;
    } 

    @media ${({ theme }) => theme.breakpoints.tablet} {
        width: 70%;
    } 
    `

const LikeButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`