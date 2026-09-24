import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useEvents } from "../hooks/useEvents";
import { filterEvents, sortEvents } from "../lib/filterEvents";
import EventCard from "../components/EventCard";
import SkeletonCard from "../components/SkeletonCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

export default function EventsPage() {
  const { events, status, retry } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("q");
    next.delete("category");
    setSearchParams(next, { replace: true });
  };

  const visibleEvents = useMemo(
    () => sortEvents(filterEvents(events, query, category)),
    [events, query, category]
  );

  return (
    <div>
      <h1 className="text-2xl font-bold sm:text-3xl">GDGoC Bowen-Events-Hub</h1>
      <p className="mt-1 text-slate-600 dark:text-slate-400">
        Find a GDGoC Bowen event and RSVP.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={query} onChange={(v) => updateParam("q", v)} />
      </div>
      <div className="mt-3">
        <CategoryFilter
          value={category}
          onChange={(v) => updateParam("category", v)}
        />
      </div>

      <div className="mt-6">
        {status === "loading" && (
          <div role="status">
            <span className="sr-only">Loading events…</span>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        )}

        {status === "error" && <ErrorState onRetry={retry} />}

        {status === "ready" && visibleEvents.length === 0 && (
          <EmptyState query={query} category={category} onClear={clearFilters} />
        )}

        {status === "ready" && visibleEvents.length > 0 && (
          <>
            <p aria-live="polite" className="mb-3 text-sm text-slate-600 dark:text-slate-400">
              Showing {visibleEvents.length} of {events.length} events
            </p>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleEvents.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}