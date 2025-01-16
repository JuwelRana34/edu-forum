
import { Skeleton, SkeletonLine } from "keep-react";

function Loading() {
  return (
    <div>
     <Skeleton className=" container mx-auto p-6 space-y-6">

  {/* Page Title */}

  <SkeletonLine className="h-6 w-2/3 mx-auto" />

  {/* Image Placeholder */}
  <Skeleton className="w-full h-48 rounded-lg bg-gray-200"></Skeleton>

  {/* Paragraph Placeholder */}
  <Skeleton className="space-y-4">
    <SkeletonLine className="h-4 w-11/12" />
    <SkeletonLine className="h-4 w-10/12" />
    <SkeletonLine className="h-4 w-9/12" />
    <SkeletonLine className="h-4 w-8/12" />
  </Skeleton>

  {/* Card Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <Skeleton className="p-4 space-y-3 bg-gray-200 rounded-lg">
      <SkeletonLine className="h-4 w-3/4" />
      <SkeletonLine className="h-4 w-full" />
      <SkeletonLine className="h-4 w-2/3" />
    </Skeleton>
    <Skeleton className="p-4 space-y-3 bg-gray-200 rounded-lg">
      <SkeletonLine className="h-4 w-3/4" />
      <SkeletonLine className="h-4 w-full" />
      <SkeletonLine className="h-4 w-2/3" />
    </Skeleton>
    <Skeleton className="p-4 space-y-3 bg-gray-200 rounded-lg">
      <SkeletonLine className="h-4 w-3/4" />
      <SkeletonLine className="h-4 w-full" />
      <SkeletonLine className="h-4 w-2/3" />
    </Skeleton>
  </div>

  {/* Footer Placeholder */}
  
  <SkeletonLine className="h-4 w-1/3 mx-auto" />
</Skeleton>

    </div>
  );
}

export default Loading;
