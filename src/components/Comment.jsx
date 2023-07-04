import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { format } from 'timeago.js'

const Container = styled.div`
display: flex;
gap: 10px;
align-items: center;
margin: 20px 0px;
`

const Avatar = styled.img`
 height: 50px;
    width: 50px;
    border-radius: 50%;
`

const Input = styled.input`
 border: none;
 border-bottom: 1px solid ${({theme})=>(theme.textSoft)};
 background-color: transparent;
 outline: none;
 padding:5px;
 width: 100%;
 color: ${({theme})=>(theme.text)};
`

const CommentDetails = styled.div`
 display: flex;
    flex-direction: column;
    gap:5px;
`

const CommentHeader = styled.div`
 display: flex;
    gap: 10px;
    align-items: center;
`

const Name = styled.div`
 font-weight: 500;
 font-size: 14px;
 color: ${({theme})=>(theme.text)};
`

const Time = styled.div`
 font-size: 12px;
    color: ${({theme})=>(theme.textSoft)};
`

const CommentBody = styled.div`
    font-size: 14px;
    color: ${({theme})=>(theme.text)};
`


const Comment = ({comment}) => {
  const [channel, setChannel] = useState({})

  useEffect(()=>{
    const getChannel = async () => {
      const res = await axios.get(`https://devtube.onrender.com/users/find/${comment.userId}`);
      setChannel(res.data)
    }
    getChannel()
  },[comment.userId]);

  return (
    <Container>
  <Avatar src={channel.user?.img} />
                <CommentDetails>
                    <CommentHeader>
                        <Name>{channel.user?.username}</Name>
                        <Time>{format(comment.createdAt )}</Time>
                    </CommentHeader>
                    <CommentBody>
                        {comment.desc}
                    </CommentBody>
                </CommentDetails>
    </Container>
  )
}

export default Comment