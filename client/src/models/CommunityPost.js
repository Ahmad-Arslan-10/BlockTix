import mongoose from "mongoose";

const communityPostSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
    unique: true,
  },
  firebase_uid: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorPicture: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    default: '',
  },
  likes: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

export default mongoose.models.CommunityPost || mongoose.model('CommunityPost', communityPostSchema);
