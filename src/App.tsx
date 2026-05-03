import "./App.css";
import Card from "./components/Card";
import {
  PersianDate,
  PersianTime,
} from "./components/DateTime";

import UsdPrice from "./components/UsdPrice";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Wrapper>
      <Card>
        <UsdPrice />
        <div className="flex items-center justify-center">
        </div>
        <div className="flex items-center justify-between my-6">
          <PersianTime />
          <PersianDate />
          {/* <HijriDate /> */}
        </div>
      </Card>
    </Wrapper>
  );
}

export default App;
