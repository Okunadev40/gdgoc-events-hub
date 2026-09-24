import Button from "./ui/Button";

export default function ErrorState({ message, onRetry }) {
  return (
    <div role="alert" className="py-16 text-center">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        {message || "We couldn't load the events."}
      </p>
      <Button onClick={onRetry} className="mt-4">
        Try again
      </Button>
    </div>
  );
}