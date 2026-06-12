import mongoose from "mongoose";

const communityLikeSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
    index: true,
  },
  firebase_uid: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

communityLikeSchema.index({ postId: 1, firebase_uid: 1 }, { unique: true });

export default mongoose.models.CommunityLike || mongoose.model('CommunityLike', communityLikeSchema);
