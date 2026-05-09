import { useDateTime } from "../../hooks/useDateTime";

const DateTimeCard = () => {
  const { gregorian, persian, time } = useDateTime();

  return (
    <div className="datetime-card">
      <div className="datetime-card__time">{time}</div>
      <div className="datetime-card__divider" />
      <div className="datetime-card__dates">
        <span className="datetime-card__gregorian">{gregorian}</span>
        <span className="datetime-card__persian">{persian}</span>
      </div>
    </div>
  );
};

export default DateTimeCard;
