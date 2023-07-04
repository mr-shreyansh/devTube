import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

const app = express();
// json
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000','https://mr-shreyansh.github.io/devTube','https://mr-shreyansh.github.io'], // Replace with the appropriate origin(s)
    credentials: true,
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
  }));

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then( ()=> { 
    console.log('Connected to DB');
}).catch( (err)=> {
    console.log(err);
});
// Import Routes
app.use('/users', userRoutes);
app.use('/videos', videoRoutes);
app.use('/comments', commentRoutes);
app.use('/auth', authRoutes);


app.use((err, req, res, next)=> {
    const status = err.statusCode || 500;
    const message = err.message || 'something went wrong';
    return res.status(status).json({
        success: false,
        status: status,
        message: message
    });

})

app.listen(4000, ()=>{
    console.log('Server is running on port 4000');
})

