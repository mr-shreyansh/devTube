import styled from "styled-components";

import React from 'react'
import MeTube from '../images/youtube.png'
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import MovieOutlined from '@mui/icons-material/MovieOutlined';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import LiveTvOutlined from '@mui/icons-material/LiveTvOutlined';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import FlagOutlined from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlined from '@mui/icons-material/HelpOutlineOutlined';
import SettingsBrightnessOtlined from '@mui/icons-material/SettingsBrightnessOutlined';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Container = styled.div`
 flex:1;
  background-color: ${({ theme }) => (theme.bgLighter)};
  
  height:100vh;
  overflow-y: scroll;
  scrollbar-width: none;
  ::-webkit-scrollbar{
    display:none;
  }
  color: ${({ theme }) => (theme.text)} ;
  font-size: 14px;
  position: sticky;
  top:0;

`
const Wrapper = styled.div`
  padding: 18px 16px;
  
`
const Logo = styled.div`
display:flex;
align-items:center;
 gap: 5px;
 font-weight: bold;
 margin-bottom: 20px;
 color: ${({ theme }) => (theme.text)};
`
const Img = styled.img`
 height: 25px;
 padding-right: 5px;
 
`

const Item = styled.div`
display:flex;
align-items:center;
gap: 20px;
cursor: pointer;
padding: 7.5px 0;
color: ${({ theme }) => (theme.text)};
&:hover{
  background-color: ${({ theme }) => (theme.soft)};
}
`

const Hr = styled.hr`
margin: 15px 0px;
border: 0.5px solid ${({ theme }) => (theme.soft)};
`

const Login = styled.div`

`
const Button = styled.button`
 padding : 5px 15px;
 background-color: transparent;
 border : 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 2px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: 5px;
  display: flex;
  align-items: center;
  gap:5px;
`

const Menu = ({ darkMode, setDarkMode }) => {
   const {currentUser} = useSelector((state)=>state.user);
  return (
    <Container>
      <Wrapper>
        <Link to='/' style={{ textDecoration: 'none', }}>
          <Logo>
            <Img src={MeTube}>
            </Img>
            DevTube
          </Logo>
        </Link>
        <Link to="/">
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link >
        <Link to="trends">
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        <Link to="subscriptions">
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />{
          !currentUser && (
            <>
              <Login>
                Sign in to like videos, comment, and subscribe.
                <Link to='signin' style={{ textDecoration: 'none' }}>
                  <Button><AccountCircleOutlined /> Sign in</Button>
                </Link >
              </Login>
              <Hr />
            </>
          )
        }

        Best of DevTube
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item>
          <MovieOutlined />
          Movies
        </Item>
        <Item>
          <ArticleOutlined />
          News
        </Item>
        <Item>
          <LiveTvOutlined />
          Live
        </Item>
        <Hr />
        <Item>
          <AccountCircleOutlined />
          Account
        </Item>
        <Item>
          <SettingsOutlined />
          Settings
        </Item>
        <Item>
          <FlagOutlined />
          Report history
        </Item>
        <Item>
          <HelpOutlineOutlined />
          Help
        </Item>
        <Item onClick={() => { setDarkMode(!darkMode) }}>
          <SettingsBrightnessOtlined />
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Item>

      </Wrapper>
    </Container>
  )
}

export default Menu