import React, { useState, useMemo, useEffect } from 'react'; 
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { useGlobalContext } from './context/globalContext';
import ViewTransactions from './Components/ViewTransactions/ViewTransactions';

function App() {
    const { token, setToken } = useGlobalContext();
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (!token) {
            setActive(0);
        }
    }, [token]);

    const handleLogin = (token) => {
        setToken(token);
        setActive(1);
    };

    const handleLogout = () => {
        setToken(null);
        setActive(0);
    };

    const displayData = () => {
        if (!token) {
            return active === 2 ? <Register /> : <Login onLogin={handleLogin} />;
        }

        switch (active) {
            case 1:
                return <Dashboard onLogout={handleLogout} />;
            case 2:
                return <ViewTransactions />;
            case 3:
                return <Income />;
            case 4:
                return <Expenses />;
            default:
                return <Dashboard onLogout={handleLogout} />;
        }
    };

    const orbMemo = useMemo(() => <Orb />, []);

    return (
        <AppStyled bg={bg} className="App">
            {orbMemo}
            <MainLayout>
                {token && <Navigation active={active} setActive={setActive} onLogout={handleLogout} />}
                <main>
                    {displayData()}
                </main>
            </MainLayout>
        </AppStyled>
    );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0; /* Hide scrollbar */
    }
  }

  /* Mobile responsive styles */
  @media (max-width: 768px) {
    main {
      border-radius: 16px; /* Reduced border radius */
      padding: 1rem; /* Add padding for smaller screens */
      overflow-y: auto; /* Allow vertical scrolling */
    }

    /* Adjust Navigation for mobile */
    nav {
      display: flex;
      flex-direction: column; /* Stack items vertically */
      align-items: center;
      width: 100%; /* Full width for navigation */
    }
  }

  /* Further adjustments for very small screens */
  @media (max-width: 480px) {
    main {
      padding: 0.5rem; /* Less padding */
    }
    
    /* Ensure that the orb component is smaller on very small screens */
    .orb {
      width: 50px; /* Smaller orb size */
      height: 50px; /* Smaller orb size */
    }
  }
`;

export default App;
