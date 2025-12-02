import { useState } from 'react'
import styled from 'styled-components'
import { Paragraph } from '../../styling/typography.js'

export const LikeButton = () => {
    const [likeCount, setLikeCount] = useState(0)

    const handleLike = () => {
        setLikeCount(likeCount + 1)
    }

    return (
        <ButtonWrapper>
            <StyledLikeButton type="button" onClick={handleLike}>
                ❤️ 
            </StyledLikeButton>
            <Paragraph> x {likeCount}</Paragraph>
        </ButtonWrapper>
    )
}

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const StyledLikeButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
    }
`