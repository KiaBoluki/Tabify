import { useState, useEffect } from "react";

const useCurrentTime = (intervalMs = 1000) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);
  return currentTime;
};

export const PersianDate = () => {
  const time = useCurrentTime();
  return (
    <div>
      {time.toLocaleDateString("fa-IR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      })}
    </div>
  );
};

export const HijriDate = () => {
  const time = useCurrentTime();
  return (
    <div>
      {time.toLocaleDateString("ar-SA-u-ca-islamic-umalqura", {
        day: "2-digit",
        weekday: "long",
        year: "numeric",
      })}
    </div>
  );
};

export const PersianTime = () => {
  const time = useCurrentTime();
  return (
    <div>
      {time.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })}
    </div>
  );
};

const DateTime = () => {
  const time = useCurrentTime();
  return (
    <div className="ltr font-thin">
      {time.toLocaleDateString("en-US", { month: "long", day: "2-digit" })}
    </div>
  );
};

export default DateTime;