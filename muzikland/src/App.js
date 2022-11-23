
import './App.css';
import styled from "styled-components";
import { AccountBox } from './pages/AuthencationPage/Authentication.jsx';
import { BrowserRouter } from 'react-router-dom';

const AppContainer = styled.div `
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
function App() {
  return <AppContainer>
    <BrowserRouter>
      <AccountBox/>
    </BrowserRouter>
  </AppContainer>;
}

export default App;
