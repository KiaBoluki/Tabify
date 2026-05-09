import { useState, useEffect } from "react";

interface DateTimeState {
  gregorian: string;
  persian: string;
  time: string;
  hours: number;
}

export function useDateTime(): DateTimeState {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const gregorian = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
  });

  const persian = now.toLocaleDateString("fa-IR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return { gregorian, persian, time, hours: now.getHours() };
}
