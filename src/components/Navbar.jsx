import { AccountCircleOutlined, SearchOutlined, VideoCallOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Upload from './Upload'
import { logout } from '../redux/userSlice'

const Container = styled.div`
 position: sticky;
 top: 0;
 background-color: ${({ theme }) => (theme.bgLighter)};
 height:56px;
`
const Wrapper = styled.div`
 display: flex;
 align-items: center;
 justify-content: space-end;
 height: 100%;
padding: 0px 20px;
position: relative;
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
  font-weight: 5px;
  display: flex;
  align-items: center;
  gap:5px;
`

const Search = styled.div`
 postion:absolute;
 width: 40%;
 left:0;
 right:0;
 margin:auto;
 display: flex;
 align-items: center;
 justify-content: space-between;
 padding: 5px;
 border: 1px solid #ccc;
 border-radius: 5px;
`

const Input = styled.input`
 border:none;
  outline: none;
  height: 100%;
 background-color: transparent;
`

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight:500;
  color: ${({ theme }) => (theme.text)};
`

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  image-rendering: pixelated;
  border-radius: 50%;
  background-color: ${({ theme }) => (theme.soft)};
`
const Button2 = styled.button`
padding : 1px 5px;
margin: 5px 5px;
width: 100%;
 background-color: transparent;
 border : 1px solid #999;
  color: ${({ theme }) => (theme.text)};
  border-radius: 2px;
  cursor: pointer;
  font-weight: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap:5px;
`

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
<>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search" />
            <SearchOutlined />
          </Search>
         { user ? 
         (
         <User>
           <VideoCallOutlined onClick={()=> setOpen(true)}/>
           <Avatar src={user?.img}/>
           <a style={{border:'1px solid #999', padding:'1px 2px', borderRadius:'5px',display:'flex'}}>
           <Button2 style={{textAlign:'center'}}>{user?.username}</Button2>
           <Button2 style={{color:'#999',}} onClick={e=>{
            dispatch(logout());
            navigate('/');
          }
          }>Sign out</Button2>
           </a>
         </User>
         ) :
          <Link to='signin' style={{textDecoration:'none'}}>
            <Button><AccountCircleOutlined /> Sign in</Button>
          </Link>}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
</>
  )
}

export default Navbar