import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from './Card'

const Recomedation = ({tags}) => {

    const [videos, setVideos] = useState([])

  const Container = styled.div`
    flex: 2;
   `
 useEffect(()=>{
    const getVideos = async () => {
        const res = await axios.get(`https://devtube.onrender.com/videos/tags?tags=${tags}`)
        setVideos(res.data)
    }
    getVideos()
    },[tags]);

  return (
    <Container>
        {
            videos.map((video)=>(
                <Card key={video._id} video={video}/>
            ))

        }      

    </Container>
  )
}

export default Recomedation