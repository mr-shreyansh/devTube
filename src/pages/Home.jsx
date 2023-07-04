import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from 'axios'
import env from 'react-dotenv';
env.config();

const Container = styled.div`
display:flex;
justify-content:center;
flex-wrap:wrap;
gap: 3vw;
`

const Home = ({type}) => {
  const url = env.BASE_URL;
   const [videos, setVideos] = useState([]);

   useEffect(() => {
     const fetchVideos = async () => {
      try{
        const res =await axios.get(`https://devtube.onrender.com/videos/${type}`);
        console.log(res.data);
        setVideos(res.data);
      }
      catch(err){
        console.log(err);
      };
     }
      fetchVideos();
   },[])
  return (
    <Container>
      {videos?.map((video) => (
        <div>
          {console.log(video)}
          <Card key={video._id} x={video} />
        </div>
      ))
    }
        
    </Container>
  )
}

export default Home