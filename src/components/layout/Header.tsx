import { styled } from "styled-components"

type HeaderProps = {
    likedCount: number
    isLoggedIn: boolean
    onLoginClick: () => void
    onLogoutClick: () => void
}

export const Header =({ likedCount, isLoggedIn, onLoginClick, onLogoutClick }: HeaderProps ) => {
    return (
        <NavBar>
            <Left>
                {isLoggedIn ? (
                    <Button 
                        type="button"
                        onClick={onLogoutClick}
                    >
                        Logout
                    </Button>
                ) : (
                    <Button
                        type="button"
                        onClick={onLoginClick}
                    >
                        Login / Sign Up
                    </Button>
                )}
            </Left>

            <Right>
                You liked ❤️ {likedCount} posts
            </Right>
        </NavBar>
    )
}

const NavBar = styled.div`
    background-color: ${({ theme }) => theme.colors.primary};
    display: flex;
    justify-content: flex-end;
    justify-content: space-between;
    padding: 10px 30px;
`

const Left =styled.div`
    color: white;
    display: flex;
    align-items: center;
`

const Right = styled.div`
    color: white;
    display: flex;
    align-items: center;
`

const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.secondary};
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    padding: 8px 16px;

    &:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
    }
`