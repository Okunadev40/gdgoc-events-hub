const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Lagos",
});

export function formatDate(iso) {
  return dateFormatter.format(new Date(iso));
}

export function isPast(iso) {
  return new Date(iso).getTime() < Date.now();
}