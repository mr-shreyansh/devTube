import { AddTaskOutlined, ReplyOutlined, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Comments from '../components/Comments';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { dislike, fetchFailure, fetchStart, fetchSuccess, like } from '../redux/videoSlice';
import { format } from 'timeago.js';
import { subscription } from '../redux/userSlice';
import ReactPlayer from 'react-player/lazy';
import Recomedation from '../components/Recomedation';


const Container = styled.div`
 display: flex;
 gap:24px;
 margin-left: 20px;
`

const Content = styled.div`
 flex:5;
 
`

const VideoWrapper = styled.div`
 
`

const Title = styled.h1`
 font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => (theme.text)};
`

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => (theme.textSoft)};
`



const Buttons = styled.div`
 display: flex;
 gap:20px;
 color: ${({ theme }) => (theme.text)};
`

const Button = styled.div`
 display: flex;
  align-items: center;
  gap: 5px;
`

const Hr = styled.hr`
border: 0.5px solid ${({ theme }) => (theme.textSoft)};
margin: 15px 0px;
`

const Recommendations = styled.div`
 flex:2;
`

const Channel = styled.div`
display: flex;
justify-content: space-between;

`;
const ChannelInfo = styled.div`
display: flex;
gap: 10px;
color: ${({ theme }) => (theme.text)};
`;


const Image = styled.img`
height: 50px;
width: 50px;
border-radius: 50%;
`;

const ChannelDetails = styled.div`
display: flex;
flex-direction: column;
color: ${({ theme }) => (theme.text)};
`;

const ChannelName = styled.div`
font-weight: 500;
`;

const ChannelCounter = styled.div`
 margin-top: 5px;
 margin-bottom: 15px;
 color: ${({ theme }) => (theme.textSoft)};
 font-size: 12px;
`;

const Description = styled.div`
 font-size: 14px;
`;

const Subscribe = styled.div`
 background-color: #cc1a00;
 font-weight: 500;
 color:white;
 border: none;
  border-radius: 2px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Subscribed = styled.div`
 background-color: #777;
 font-weight: 500;
 color:white;
 border: none;
  border-radius: 2px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
 max-height: 580px;
  width: 100%;
  object-fit: cover;
`



const Video = () => {
  const { currentUser } = useSelector(state => state.user)
  const { currentVideo } = useSelector(state => state.video)
  const dispatch = useDispatch()

  const path = useLocation().pathname.split('/')[2];
  const access_token = useSelector(state => state.user.mytoken)
  const subscribed = useSelector(state => state.user.currentUser.subscribed)
  const [channel, setChannel] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart());
      try {
        const videoRes = await axios.get(`https://devtube.onrender.com/videos/find/${path}`);
        const id = videoRes.data.userId;
        const channelRes = await axios.get(`https://devtube.onrender.com/users/find/${id}`);
        setChannel(channelRes.data.user);
        dispatch(fetchSuccess(videoRes.data));

      } catch (err) {
        console.log(err);
        fetchFailure();
      }
    }
    fetchData();
  }, [path, dispatch])

  const handleLike = async () => {
    try {
      
      await axios.put(`https://devtube.onrender.com/users/like/${currentVideo?._id}`, {},
      {
        withCredentials: true,
        headers: {
          Cookie: `access_token=${access_token}`,
        },
      })
      dispatch(like(currentUser?._id));

    }
    catch (err) {
      console.log(currentVideo?._id)
      console.log(err)
    }
  };

  const handleDislike = async () => {
    await axios.put(`https://devtube.onrender.com/users/dislike/${currentVideo?._id}`, {},
    {
      withCredentials: true,
      headers: {
        Cookie: `access_token=${access_token}`,
      },
    }); 
    
    dispatch(dislike(currentUser?._id));
  };

  const handleSubscribe = async () => {
     console.log(channel._id)
    try {
       currentUser.subscribedUsers.includes(channel?._id) ?
      await axios.put(`https://devtube.onrender.com/users/unsub/${channel?._id}`, {},
      {
        withCredentials: true,
        headers: {
          Cookie: `access_token=${access_token}`,
        },
      })
      :
      await axios.put(`https://devtube.onrender.com/users/sub/${channel?._id}`, {},
      {
        withCredentials: true,
        headers: {
          Cookie: `access_token=${access_token}`,
        },
      })
      dispatch(subscription(channel._id));
    }
    catch (err) {
      console.log(err)
    }
  };


  return (
    <Container>
      <Content>
        <VideoWrapper>
         <ReactPlayer width={'100%'} url={currentVideo?.videoUrl} controls={true} playing={true} />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <info>{currentVideo?.views} Views • {format(currentVideo?.createdAt)}</info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo &&
                <>
                  {
                    currentVideo.likes?.includes(currentUser?._id) ?
                      <>
                        <ThumbUp /> {currentVideo?.likes?.length}
                      </> 
                      :
                      <>
                        <ThumbUpOutlined />  {currentVideo?.likes?.length}
                      </>
                  }
                </>
              }
            </Button>
            <Button onClick={handleDislike}>
              {
                currentVideo &&
                <>
                  {
                    currentVideo.dislikes?.includes(currentUser?._id) ?
                     <>
                       <ThumbDown /> {currentVideo?.dislikes?.length}
                     </>
                      :
                      <>
                        <ThumbDownOutlined /> {currentVideo?.dislikes?.length}
                      </>
                  }
                </>
              }
            </Button>
            <Button>
              <ReplyOutlined /> Share
            </Button>
            <Button>
              <AddTaskOutlined /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetails>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>{channel?.subscribers} Subscribers</ChannelCounter>
              <Description>
                {currentVideo?.desc}
              </Description>
            </ChannelDetails>
          </ChannelInfo>
          {currentUser.subscribedUsers?.includes(channel._id) 
           ? <Subscribed onClick={handleSubscribe}>
            <div>Subscribed</div>
           </Subscribed>
           : 
            <Subscribe onClick={handleSubscribe}>
           'Subscribe'
            </Subscribe>
           }
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id}></Comments>
      </Content>
      <Recommendations>
        <Recomedation tags={currentVideo.tags} type="sm" />
      </Recommendations>
    </Container>
  )
}

export default Video