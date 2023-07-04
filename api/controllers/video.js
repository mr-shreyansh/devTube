import User from "../models/User.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next) => {
    // req.user.id will be taken from verifyToken.js and  req.body will be sent by the client
    try{
       const newVideo =  new Video({userId: req.user.id, imgUrl: req.body.imgUrl, title: req.body.title, desc: req.body.desc, videoUrl: req.body.videoUrl, tags: req.body.tags})
       const savedVideo = await newVideo.save();
         res.status(200).json(savedVideo);
   } catch (error) {
         next(error);
    }
};

export const updateVideo = async (req, res, next) => {
    try{
        const video = await Video.findById(req.params.id);
        if(video.userId !== req.user.id)
            return next(createError(403, "You can only update your videos"));
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true});

        res.status(200).json(updatedVideo);
    } catch (error) {
        next(error);
    }
};

export const deleteVideo = async (req, res, next) => {
  try{
      const video = await Video.findById(req.params.id);
        if(video.userId !== req.user.id)
            return next(createError(403, "You can only delete your videos"));
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Video deleted"});
  } catch (error) {
    next(error);
  }
};

export const getVideo = async (req, res, next) => {
   try{
         const video = await Video.findById(req.params.id);
         res.status(200).json(video);

   } catch (error) {
    next(error);
    }
};

export const addView = async (req, res, next) => {
     const video = await Video.findById(req.params.id);
        try{
            video.updateOne({$inc: {views: 1}});
            
            res.status(200).json({message: "The view has been increased"});
        }
        catch (error) {
            next(error);
        }
}

export const random = async (req, res, next) => {
 try{
   const videos = await Video.aggregate([{ $sample: {size:40} }]);
   res.status(200).json(videos);
 } catch (error) {
    next(error);
    }
};

export const trend = async (req, res, next) => {
  try{
     const videos = await Video.find().sort({views:-1});
     res.status(200).json(videos);
  } catch(error) {
    next(error);
  }
};

export const sub = async (req, res, next) => {
  try{
     const user = await User.findById(req.user.id);
     const subscribedChannels = user.subscribedUsers;
     

     const list =await Promise.all(subscribedChannels.map((channelId) => {
        return Video.find({userId: channelId})
        }))

        res.status(200).json(list.flat().sort((a,b)=> b.createdAt - a.createdAt));

  } catch(error) {
    next(error);
  }
}

export const getbytag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try{
        const videos = await Video.find({tags: {$in: tags}}).limit(20);
        console.log(videos);
        res.status(200).json(videos);
    }
    catch(error) {
        next(error);
    }
}


export const search = async (req, res, next) => {
    const query = req.query.q;
    try{
        const videos = await Video.find({title: {$regex: query, $options: "i"}}).limit(20);
        res.status(200).json(videos);
    } catch(error) {
        next(error);
    }
}