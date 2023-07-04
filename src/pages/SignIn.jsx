import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { loginFailure, loginStart, loginSuccess, tokenSuccess } from '../redux/userSlice'
import {auth, provider} from '../firebase';
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
    justify-content: center;
    height: calc(100vh - 56px);
    color: ${({theme})=>(theme.text)};
`
const Wrapper = styled.div`
 display: flex;
    flex-direction: column;
    background-color: ${({theme})=>(theme.bgLighter)};
    border: 1px solid ${({theme})=>(theme.soft)};
    padding: 20px 50px;
    gap:10px;
`

const Title = styled.h1`
font-size:24px;
`

const SubTitle = styled.h2`
font-size:20px;
font-weight:300;
`
const Input = styled.input`
 border:1px solid ${({theme})=>(theme.soft)};
 border-radius: 3px;
 padding: 10px;
 background-color: transparent;
 widht: 100%;

`

const Button = styled.button`
 border-radius: 3px;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({theme})=>(theme.soft)};
    border: none;
    color: ${({theme})=>(theme.text)};
`




const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
const handleSignin = async (e) => {
  e.preventDefault();
  dispatch(loginStart());
  try{
    const res = await axios.post(`https://devtube.onrender.com/auth/signin`, {username, password}, {withCredentials: true})
    dispatch(loginSuccess(res.data.user));  
    dispatch(tokenSuccess(res.data.token));
    navigate('/');
  } catch(err) {
    dispatch(loginFailure());
  }
}

const signInWithGoogle = async () => {
  dispatch(loginStart());
  try{
     signInWithPopup(auth, provider).
     then((result)=> {
        axios.post(`https://devtube.onrender.com/auth/google`, {
        username: result.user.displayName,
        img: result.user.photoURL,
        email: result.user.email,
      }).then((res)=> {
        console.log(res.data);
        dispatch(loginSuccess(res.data.user));
        dispatch(tokenSuccess(res.data.token));
        navigate('/');
      })
     })
  }
  catch(err) {
    dispatch(loginFailure());
  }
}

const handleSignup = () => {
     try{

     } catch(err) {
      
     }
}

  return (
    <Container>
        <Wrapper>
            <Title>Sign In</Title>
            <SubTitle>Sign in to continue</SubTitle>
            <Input placeholder="username" onChange={e=>setUsername(e.target.value)}/>
            <Input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
            <Button onClick={handleSignin}>Sign In</Button>
            <Button onClick={signInWithGoogle}>Sign In with Google</Button>
            <Title>Or</Title>
            <SubTitle>Sign up to continue</SubTitle>
            <Input placeholder="username" onChange={e=>setUsername(e.target.value)}/>
            <Input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
            <Input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
            <Button onClick={handleSignup}>Sign Up</Button>
        </Wrapper>
    </Container>
  )
}

export default SignIn