import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {format} from 'timeago.js';

const Container = styled.div`
 width:360px;
 margin-bottom: ${ (props) => props.type === 'md' ? '10px' : '30px'};
 margin: 10px auto;
 display:${(props)=>props.type === 'sm' ? 'flex' : 'block'};
 gap:10px;
 cursor: pointer;
`
const Image = styled.img`
 width:100%;
 height:${ (props) => props.type === 'sm' ? '120px' : '202px'};
 background-color: #eee;
 flex:1;
`

const Details = styled.div`
flex:1;
 display:flex;
 margin-top: ${ (props) => props.type === 'sm' ? '0px' : '10px'};
 gap: 12px;
align-items: start;
`
const ChannelImage = styled.img`
  width:36px;
    height:36px;
    border-radius: 50%;
    background-color: #999;
    display: ${ (props) => props.type === 'sm' ? 'none' : 'block' };
`

const Texts = styled.div``;

const Title = styled.h1`
 font-size: 18px;
 font-weight: 500;
 color: ${ ({theme}) => theme.text};`


const ChannelName = styled.h2`
font-size: 14px;
color: ${ ({theme}) => theme.textSoft};
margin:9px 0px;
`;

const Info = styled.div`
font-size: 14px;
color: ${ ({theme}) => theme.textSoft};
`;

const Card = ({x,type}) => {
  const [channel, setChannel] = useState({})

  useEffect(()=>{
    const fetchChannel = async () => {
      console.log(x);
      if(x){
        const res = await axios.get(`http://localhost:4000/users/find/${x?.userId}`);
        console.log(res);
        setChannel(res.data);
      }
    }
    fetchChannel();
  },[x?.userId]);


  return (
  <Link to={`/video/${x?._id}`} style={{textDecoration:"none"}}>
     <Container type={type}>
         {console.log(x)}
         <Image type={type} src={x?.imgUrl} />
         <Details type={type}>
             <ChannelImage type={type} src={channel?.img} />
             <Texts>
                 <Title>{x?.title}</Title>
                 <ChannelName>{channel?.username}</ChannelName>
                 <Info>{x?.views} views • {format(x?.createdAt)}</Info>
             </Texts>
             </Details>
     </Container>
   </Link>
  )
}

export default Card