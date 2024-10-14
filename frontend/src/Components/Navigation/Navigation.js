import React from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { signout } from '../../utils/Icons'; 
import { menuItems } from '../../utils/menuItems'; 

function Navigation({ active, setActive, onLogout }) {
    return (
        <NavStyled>
            <div className="user-con">
                <img src={avatar} alt="User Avatar" />
                <div className="text">
                    <h2>TrackX</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active' : ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>
            <div className="bottom-nav">
                <ul>
                    <li onClick={onLogout} style={{ cursor: 'pointer' }}>
                        {signout} Sign Out
                    </li>
                </ul>
            </div>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;

    @media (max-width: 1024px) {
        width: 300px;
        padding: 1.5rem 1rem;
    }

    @media (max-width: 768px) {
        width: 250px;
    }

    @media (max-width: 480px) {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        height: auto;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem;
    }

    .user-con {
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);

            @media (max-width: 768px) {
                width: 60px;
                height: 60px;
            }

            @media (max-width: 480px) {
                width: 50px;
                height: 50px;
            }
        }

        h2 {
            color: rgba(34, 34, 96, 1);

            @media (max-width: 480px) {
                font-size: 1rem;
            }
        }

        p {
            color: rgba(34, 34, 96, .6);

            @media (max-width: 480px) {
                font-size: 0.8rem;
            }
        }
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;

        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;

            i {
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;

                @media (max-width: 768px) {
                    font-size: 1.2rem;
                }
            }

            @media (max-width: 480px) {
                padding-left: 0.5rem;
            }
        }

        .active {
            color: rgba(34, 34, 96, 1) !important;

            i {
                color: rgba(34, 34, 96, 1) !important;
            }

            &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 4px;
                height: 100%;
                background: #222260;
                border-radius: 0 10px 10px 0;
            }
        }
    }

    .bottom-nav {
        ul {
            li {
                font-size: 1rem;
                display: flex;
                align-items: center;
                color: rgba(34, 34, 96, 1);
                cursor: pointer;
                padding: 0.5rem 0;
                transition: all .3s;

                &:hover {
                    color: rgba(34, 34, 96, 0.8);
                }

                @media (max-width: 480px) {
                    font-size: 0.9rem;
                }
            }
        }
    }
`;

export default Navigation;
