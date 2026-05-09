import "./App.css";
import { useUsdPrice } from "./hooks/useUsdPrice";
import DateTimeCard from "./components/features/DateTimeCard";
import CurrencyCard from "./components/features/CurrencyCard";
import QuoteCard from "./components/features/QuoteCard";

function App() {
  const usd = useUsdPrice();

  return (
    <div className="app">
      <div className="app__bg" />
      <div className="app__noise" />

      <main className="app__panel">
        <header className="panel__header">
          <div className="panel__accent" />
          <span className="panel__brand">TABIFY</span>
        </header>

        <DateTimeCard />

        <div className="panel__divider" />

        <CurrencyCard usd={usd} />

        <div className="panel__divider" />

        <QuoteCard />
      </main>
    </div>
  );
}

export default App;