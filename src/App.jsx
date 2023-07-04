import styled from "styled-components"
import Menu from "./components/Menu.jsx";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Video from './pages/Video'
import SignIn from "./pages/SignIn";

const Container = styled.div`
display:flex;
margin:0;
padding:0;
background-color: ${({theme})=>(theme.bg)};
`

const Main = styled.div`
flex:7;
background-color: ${({theme})=>(theme.bg)};
`

const Wrapper = styled.div`

`

function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
        <Menu setDarkMode={setDarkMode} darkMode={darkMode} />
        <Main>
          <Navbar />
          <Wrapper>
            <Routes>
              <Route path="/" >
                <Route index element={<Home type="random"/>}/>
                <Route path="trends" element={<Home type="trend"/>}/>
                <Route path="subscriptions" element={<Home type="sub"/>}/>
                <Route path='signin' element={<SignIn/>} />
                <Route path="video">
                  <Route path=':id' element={<Video/>}/>
                </Route>
                </Route>
            </Routes>
          </Wrapper>
        </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
