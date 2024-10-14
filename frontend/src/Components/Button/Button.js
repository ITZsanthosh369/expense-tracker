import React from 'react';
import styled from 'styled-components';

function Button({ name, icon, onClick, bg, bPad, color, bRad }) {
    return (
        <ButtonStyled 
            style={{
                background: bg,
                padding: bPad,
                borderRadius: bRad,
                color: color,
            }} 
            onClick={onClick}
        >
            {icon}
            {name}
        </ButtonStyled>
    );
}

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    
    // Add some basic styling for better usability
    padding: 0.8rem 1.2rem; // Default padding
    border-radius: 10px; // Default border-radius
    color: white; // Default text color
    font-size: 1rem; // Default font size

    // Responsive styles
    @media (max-width: 768px) {
        font-size: 0.9rem; // Slightly smaller font size on mobile
        padding: 0.6rem 1rem; // Adjust padding for smaller screens
    }

    @media (max-width: 480px) {
        font-size: 0.8rem; // Even smaller font size on very small screens
        padding: 0.5rem 0.8rem; // Further adjust padding
    }

    &:hover {
        opacity: 0.8; // Slight change on hover for better UX
    }
`;

export default Button;
