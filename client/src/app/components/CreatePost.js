'use client';

import { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function CreatePost({ currentUser, onPostCreated }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        setImagePreview(base64);
        setImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!currentUser?.uid) {
      toast.error('Login to create posts');
      return;
    }

    if (!content.trim()) {
      toast.error('Please write something');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firebase_uid: currentUser.uid,
          content: content.trim(),
          image,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setContent('');
        setImage('');
        setImagePreview('');
        toast.success('Post created');
        onPostCreated?.();
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 sm:p-6 mb-6">
      {/* User Avatar + Input */}
      <div className="flex gap-4 mb-4">
        <div>
          {currentUser?.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#FFA500]/30 flex items-center justify-center text-sm font-bold text-[#FFA500]">
              {currentUser?.displayName?.[0] || 'U'}
            </div>
          )}
        </div>
        <input
          type="text"
          placeholder="Share something with the community..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#FFA500] text-sm"
        />
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="relative mb-4 rounded-lg overflow-hidden">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-64 w-full object-cover rounded-lg"
          />
          <button
            onClick={() => {
              setImage('');
              setImagePreview('');
            }}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs"
          >
            Remove
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-white/60 hover:text-white cursor-pointer transition">
          <FaImage size={18} />
          <span className="text-sm">Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </label>

        <button
          onClick={handleSubmit}
          disabled={loading || !content.trim()}
          className="bg-[#FFA500] hover:bg-[#FF8C00] disabled:opacity-50 px-6 py-2 rounded-lg text-sm font-bold text-black transition"
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
}
