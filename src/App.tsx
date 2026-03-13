import "./App.css";
import Card from "./components/Card";
import DateTime, { HijriDate, PersianDate, PersianTime } from "./components/DateTime";
import Links from "./components/Links";
import Qoute from "./components/Qoute";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Wrapper>
      <Card>
        <div className="flex items-center justify-center">
          <DateTime />
          <div>Hello</div>
        </div>
        <div className="flex items-center justify-between my-6">
          <PersianTime />
          <PersianDate />
          <HijriDate />
        </div>
        <div className="my-6">
          <Qoute />
        </div>
        <Links />
      </Card>
    </Wrapper>
  );
}

export default App;
