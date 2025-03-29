import { env } from "@/env";
const { NEXT_PUBLIC_SESSION_DURATION } = env;

export const getSessionDuration = () => {
  const sessionDurationInMinutes = NEXT_PUBLIC_SESSION_DURATION ?? "60";
  return parseInt(sessionDurationInMinutes) * 60 * 1000;
};
