import mongoose from "mongoose";

const communityCommentSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: true,
    unique: true,
  },
  postId: {
    type: String,
    required: true,
    index: true,
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
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

export default mongoose.models.CommunityComment || mongoose.model('CommunityComment', communityCommentSchema);
