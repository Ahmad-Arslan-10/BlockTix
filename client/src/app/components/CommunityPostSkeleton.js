'use client';

import Skeleton from './Skeleton';

export default function CommunityPostSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 sm:p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton variant="circle" className="w-10 h-10" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-4 w-4" />
      </div>

      <div className="space-y-2 mb-4">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-3/4" />
      </div>

      <Skeleton className="h-48 w-full rounded-xl mb-4" />

      <div className="flex gap-4 mb-4 border-y border-white/10 py-3">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-3 w-20" />
      </div>

      <div className="flex gap-2">
        <Skeleton className="h-9 flex-1 rounded-lg" />
        <Skeleton className="h-9 flex-1 rounded-lg" />
      </div>
    </div>
  );
}
