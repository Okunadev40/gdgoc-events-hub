export function filterEvents(events, query, category) {
  const q = query.trim().toLowerCase();

  return events.filter((event) => {
    const matchesCategory = !category || event.category === category;
    const matchesQuery =
      !q ||
      event.title.toLowerCase().includes(q) ||
      event.venue.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });
}

// Upcoming events first (soonest at the top), then past events (most recent first)
export function sortEvents(events) {
  const now = Date.now();
  const time = (event) => new Date(event.date).getTime();

  const upcoming = events
    .filter((e) => time(e) >= now)
    .sort((a, b) => time(a) - time(b));
  const past = events
    .filter((e) => time(e) < now)
    .sort((a, b) => time(b) - time(a));

  return [...upcoming, ...past];
}