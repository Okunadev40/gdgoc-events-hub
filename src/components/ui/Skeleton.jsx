export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded bg-slate-200 motion-reduce:animate-none dark:bg-slate-800 ${className}`}
    />
  );
}