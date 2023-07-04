import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { format } from 'timeago.js'
import Comment from './Comment'

const Container = styled.div`

`
const NewComment = styled.div`
display: flex;
gap: 10px;
align-items: center;
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


const CommentButton = styled.button`
 border-radius: 3px;
 background-color: transparent;
 color: ${({theme})=>(theme.text)};
    border: 1px solid ${({theme})=>(theme.textSoft)};
  padding: 5px 15px;
    cursor: pointer;
    font-size: 14px;
`


const Comments = ({videoId}) => {
    const currentUser = useSelector(state => state.user.currentUser);   
    const access_token = useSelector(state => state.user.mytoken)
    const [comments, setComments] = React.useState([]);
    const [addComment, setAddComment] = React.useState('');
    useEffect(() => {
        const getComments = async () => {
            const res = await axios.get(`http://localhost:4000/comments/${videoId}`);
            setComments(res.data);
            console.log(res.data);
        
        }
        
        getComments();
    }, [setComments, videoId])

 const handlePost = async () => {
    const res = await axios.post(`http://localhost:4000/comments/`, {
        userId: currentUser._id,
        videoId: videoId,
        desc: addComment,
    },
    {
        withCredentials: true,
        headers: {
          Cookie: `access_token=${access_token}`,
        },
      }
    );
    console.log(res.data);
    setComments([...comments, res.data]);
    setAddComment('');
 }    

  return (
    <Container>
        <NewComment>
            {console.log(currentUser)}
            <Avatar src={currentUser.img} />
            <Input placeholder='Add a public comment...' onChange={e=>setAddComment(e.target.value)}></Input>
            {
                addComment.length > 0 && <CommentButton onClick={handlePost}>Post</CommentButton>
            }
        </NewComment>
      {
        comments.map((comment, index) => (
            <Comment key={index} comment={comment}/>
        
        ))

      }
       

    </Container>
  )
}

export default Comments