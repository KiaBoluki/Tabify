const currentDate = new Date();

const DateTime = () => {
  return <>{currentDate.toLocaleDateString("en-US", { day: "2-digit" })}</>;
};

const PersianDate = () => {
  return {
    weekday: currentDate.toLocaleDateString("fa-IR", { weekday: "long" }),
    day: currentDate.toLocaleDateString("fa-IR", { day: "2-digit" }),
    month: currentDate.toLocaleDateString("fa-IR", { month: "long" }),
    year: currentDate.toLocaleDateString("fa-IR", { year: "numeric" }),
  };
};

const PersianShortDate = () => {
  return (
    
      <h1 className="text-center text-5xl font-bold font-[Vazirmatn]">
        {PersianDate().weekday} {PersianDate().day} {PersianDate().month}
      </h1>
    
  );
};
export default DateTime;
export { DateTime, PersianDate, PersianShortDate };
