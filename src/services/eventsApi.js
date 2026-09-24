import events from "../data/events.json";

const DELAY_MS = 800;

/**
 * @typedef {Object} Event
 * @property {string} id
 * @property {string} title
 * @property {string} date       ISO date string
 * @property {string} category
 * @property {string} venue
 * @property {string} description
 * @property {string} details
 * @property {number} going
 */

/** @returns {Promise<Event[]>} */
export function fetchEvents() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Add ?fail=1 to the URL to test the error state
      const shouldFail =
        new URLSearchParams(window.location.search).get("fail") === "1";

      if (shouldFail) {
        reject(new Error("Could not load events"));
      } else {
        resolve(events);
      }
    }, DELAY_MS);
  });
}