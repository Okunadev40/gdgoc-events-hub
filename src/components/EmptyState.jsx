import Button from "./ui/Button";

export default function EmptyState({ query, category, onClear }) {
  const parts = [];
  if (query) parts.push(`"${query}"`);
  if (category) parts.push(`in ${category}`);

  return (
    <div className="py-16 text-center">
      <h2 className="text-xl font-semibold">No events found</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Nothing matches {parts.join(" ") || "your filters"}. Try a different search
        or category.
      </p>
      <Button variant="secondary" onClick={onClear} className="mt-4">
        Clear filters
      </Button>
    </div>
  );
}