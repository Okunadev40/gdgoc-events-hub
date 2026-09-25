import { CATEGORIES, LEVELS } from "../constants";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRsvp(form) {
  const errors = {};
  const name = form.name.trim();
  const email = form.email.trim();

  if (!name) errors.name = "Enter your full name.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";

  if (!email) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";

  if (!LEVELS.includes(form.level)) errors.level = "Select your level.";

  if (!CATEGORIES.includes(form.track)) errors.track = "Select your track.";

  return errors;
}