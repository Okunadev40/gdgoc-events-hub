import Skeleton from "./ui/Skeleton";

export default function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
    >
      <Skeleton className="h-5 w-16 rounded-full" />
      <Skeleton className="mt-4 h-6 w-3/4" />
      <Skeleton className="mt-3 h-4 w-1/2" />
      <Skeleton className="mt-2 h-4 w-2/3" />
      <Skeleton className="mt-4 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-5/6" />
    </div>
  );
}