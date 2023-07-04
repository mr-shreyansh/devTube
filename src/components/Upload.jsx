import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {doc} from 'firebase/firestore';
import {getStorage, uploadBytesResumable, getDownloadURL, ref} from 'firebase/storage'
import app from '../firebase';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
 width: 100%;
    height: 100%;
    position:absolute;
    top:0;
    left:0;
    background-color: rgba(0,0,0,0.5);
    display:flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
    
`

const Wrapper = styled.div`
  width: 600px;
    height: 600px;
    background-color: ${({ theme }) => (theme.bg)};
    color: ${({ theme }) => (theme.text)};
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap:20px;
    position: relative;
    z-index: 10;
`

const Close = styled.div`
 position: absolute;
    top: 10px;
    right: 10px;
    font-size: 30px;
    cursor: pointer;
    color: ${({ theme }) => (theme.textSoft)};

`

const Title = styled.h1`
 text-align: center;
`
const Desc = styled.textarea`
border: 1px solid ${({ theme }) => (theme.textSoft)};
 color: ${({ theme }) => (theme.text)};
    padding: 10px;
    border-radius: 5px;
    background-color: transparent;
`

const Input = styled.input`
 border: 1px solid ${({ theme }) => (theme.textSoft)};
 color: ${({ theme }) => (theme.text)};
    padding: 10px;
    border-radius: 5px;
    background-color: transparent;
`
const Button = styled.button`
 border-radius:3px;
 border:none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({ theme }) => (theme.bgLighter)};
    color: ${({ theme }) => (theme.textSoft)};
`
const Label = styled.label`
 border-radius:3px;
 border:none;
    font-weight: 500;
    padding-left:5px;
    margin-bottom:-15px;
    cursor: pointer;
    font-size:14px;
    color: ${({ theme }) => (theme.textSoft)};
`

const Upload = ({setOpen}) => {
    const [img, setImg] = useState(null)
    const [video, setVideo] = useState(null)
    const [imgPerc, setImgPerc] = useState(0)
    const [videoPerc, setVideoPerc] = useState(0)
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState("")
    const handleTags = (e) => {
      const str = e.target.value;
        setTags(str.split(","))
    }
    const access_token = useSelector(state => state.user.access_token)
    const navigate = useNavigate();

    const uploadFile =async (file, urlType) => {
        const storage = getStorage(app);
       let fileName = new Date().getTime() + file?.name;
       const storageRef = ref(storage, `files/${file?.name}`);
         const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if(urlType === "imgUrl") {
                    setImgPerc(progress)
                } else if(urlType === "videoUrl") {
                    setVideoPerc(progress)
                }
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                    default:
                        break;
                }

            }
            , (error) => {
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                     setInputs((prev)=>({...prev, [urlType]:downloadURL}))
                 });
            }
            );

    }

    const handleChange = (e) => {
        setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
    }

    useEffect(() => {
       video && uploadFile(video, "videoUrl");
    }, [video]);
    
    useEffect(() => {
      img &&  uploadFile(img, "imgUrl");
    }, [img]);

    const handleUpload =async (e) => {
        e.preventDefault();
        console.log(inputs)
        const res = await axios.post('http://localhost:4000/videos', 
        {
            ...inputs, tags
        },
        {
            withCredentials: true,
            headers: {
              Cookie: `access_token=${access_token}`,
            },
          }
        );
        setOpen(false);
        setImg(null);
        setVideo(null);
        res.status === 200 && navigate(`/video/${res.data._id}`)
        
    }
  return (
    <Container >
        <Wrapper>
            <Close onClick={()=>setOpen(false)}>✖</Close>
            <Title>Upload a New Video</Title>
            <Label>Video:</Label>
          {  videoPerc > 0 ? <progress style={{width:'100%'}} value={videoPerc} width="100%" max="100" /> :
          <Input type="file" accept="video/*" onChange={(e)=>setVideo(e.target.files[0])} />
          }
            <Input type="text" placeholder="Title" name='title' onChange={handleChange} />
            <Desc placeholder="Description" name="desc" onChange={handleChange} rows={8} />
            <Input type="text" placeholder="Separate the tags with commas." onChange={handleTags}/>
            <Label>Thumbnail:</Label>
{  img ? <progress style={{width:'100%'}} value={imgPerc} width="100px" max="100" /> :
           <Input type="file" accept="image/*" onChange={e=>setImg(e.target.files[0])} />
}
            <Button onClick={handleUpload}>Upload</Button>
        </Wrapper>
    </Container>
  )
}

export default Upload