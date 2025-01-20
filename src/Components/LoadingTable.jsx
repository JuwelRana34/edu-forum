import { Skeleton, SkeletonLine } from "keep-react";

function LoadingTable() {
  return (
    <div>
      <Skeleton className="container mx-auto p-6 space-y-6">
        <SkeletonLine className="h-6 w-2/3 mx-auto mb-4" />

        <Skeleton className="space-y-4 bg-gray-200 p-4 rounded-lg">
          <div className="grid grid-cols-4 gap-4">
            <SkeletonLine className="h-6 w-full" />
            <SkeletonLine className="h-6 w-full" />
            <SkeletonLine className="h-6 w-full" />
            <SkeletonLine className="h-6 w-full" />
          </div>

          {[...Array(5)].map((_, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 mt-4">
              <SkeletonLine className="h-4 w-full" />
              <SkeletonLine className="h-4 w-3/4" />
              <SkeletonLine className="h-4 w-2/3" />
              <SkeletonLine className="h-4 w-1/2" />
            </div>
          ))}
        </Skeleton>
      </Skeleton>
    </div>
  );
}

export default LoadingTable;
