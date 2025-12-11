import styled, { keyframes } from 'styled-components'

export const HeartLoader = () => {
    return <Heart>❤️</Heart>
}

const bounce = keyframes`
    0%, 100% { transform: translateY(0);}
    50% { transform: translateY(-12px);}
`

const Heart = styled.div`
    font-size: 40px;
    animation: ${bounce} 0.6s infinite ease-in-out;
    text-align: center;
`