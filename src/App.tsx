import "./App.css";
import Card from "./components/Card";
import DateTime, { PersianDate, PersianTime } from "./components/DateTime";
import Link from "./components/Link";
import Qoute from "./components/Qoute";

function App() {
  return (
    <div className="wrapper text-white bg-slate-300 min-h-screen flex justify-center items-center">
      <Card>
        <div className="flex items-center justify-center">
          <DateTime />
        </div>
        <div className="flex items-center justify-between my-6">
          <PersianTime />
          <PersianDate />
        </div>
        <div className="my-6">
          <Qoute />
        </div>
        <div className="text-sm font-light grid grid-cols-4">
          <Link to="youtube" />
          <Link to="telegram" />
          <Link to="whatsapp" />
          <Link to="gmail" />
        </div>
      </Card>
    </div>
  );
}

export default App;
