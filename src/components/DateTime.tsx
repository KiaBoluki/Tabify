import { useState, useEffect } from "react";

export const PersianDate = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const persianDate = currentTime.toLocaleDateString("fa-IR", {
    day: "2-digit",
    weekday: "long",
    month: "long",
  });

   useEffect(() => {
     const interval = setInterval(() => {
       setCurrentTime(new Date());
     }, 1000);

     // Cleanup interval on component unmount
     return () => clearInterval(interval);
   }, []);

  return <div>{persianDate}</div>;
};

export const PersianTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

const persianTime = currentTime.toLocaleTimeString("fa-IR", {
  hour: "2-digit",
  minute: "2-digit",
});
  return (
    <div>
      {persianTime}
    </div>
  ); 
};

const DateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ltr font-thin">
      {currentTime.toLocaleDateString('en-US', {
        month:"long", day: "2-digit"
      })}
    </div>
  ); 
};

export default DateTime;
