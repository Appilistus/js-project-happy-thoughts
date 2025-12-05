import styled from 'styled-components'

export const LikeButton = ({ hearts, liked, onLike }) => {
    return (
        <ButtonWrapper>
            <StyledLikeButton 
                type="button" 
                onClick={onLike}
                liked={liked}
            >
                ❤️ 
            </StyledLikeButton>
            <p> x {hearts}</p>
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
    background-color: ${({ theme, liked }) => 
        liked ? theme.colors.primary : theme.colors.formBackground };
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