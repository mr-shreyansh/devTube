import Comments from "../models/Comments.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, next) => {
    try{
        const comment = await Comments.create({userId: req.user.id,...req.body});
        res.status(200).json(comment);
    } catch(error) {
        next(error);
    }
}

export const deleteComment = async (req, res, next) => {
 try{
      const comment = await Comments.findById(req.params.id);
      const video = await Video.findById({videoId: comment.videoId});
       if(comment.userId !== req.user.id && video.userId !== req.user.id)
            return next(createError(403, "You can only delete your comments"));
        await Comments.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Comment deleted"});
       
 } catch(err) {
        next(err);
 }
};

export const getComment = async (req, res, next) => {
 try{
      const comments = await Comments.find({videoId: req.params.videoId});
        res.status(200).json(comments);

 } catch(err) {
        next(err);
 }
}