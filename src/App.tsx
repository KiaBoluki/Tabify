import "./App.css";
import Card from "./components/Card";
import DateTime, { PersianDate, PersianTime } from "./components/DateTime";

function App() {
  return (
    <div className="wrapper text-white bg-slate-300 min-h-screen flex justify-center items-center">
      <Card>
        <div className="flex items-center justify-center">
          <DateTime/>
        </div>
        <div className="flex items-center justify-between">
          <PersianTime />
          <PersianDate />
        </div>
      </Card>
    </div>
  );
}

export default App;
