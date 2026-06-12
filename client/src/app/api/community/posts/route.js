import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CommunityPost from '@/models/CommunityPost';
import User from '@/models/User';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    const skip = (page - 1) * limit;

    const posts = await CommunityPost.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await CommunityPost.countDocuments();

    return NextResponse.json({
      success: true,
      posts,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('GET Posts Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const { firebase_uid, content, image } = await req.json();

    if (!firebase_uid || !content?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ firebase_uid }).lean();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const postId = uuidv4();
    const post = new CommunityPost({
      postId,
      firebase_uid,
      authorName: user.name,
      authorPicture: user.profilePicture || '',
      content: content.trim(),
      image: image || '',
    });

    await post.save();

    return NextResponse.json({
      success: true,
      message: 'Post created',
      post,
    });
  } catch (error) {
    console.error('POST Post Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
