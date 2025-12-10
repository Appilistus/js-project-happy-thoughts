import { styled } from "styled-components"

type HeaderProps = {
    likedCount: number;
}

export const Header =({ likedCount }: HeaderProps ) => {
    return (
        <NavBar>
            ❤️ {likedCount} liked
        </NavBar>
    )
}

const NavBar = styled.div`
    background-color: ${({ theme }) => theme.colors.primary};
    display: flex;
    justify-content: flex-end;
    padding: 10px 30px;
`