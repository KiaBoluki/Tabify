import PriceRow from "../ui/PriceRow";
import { CURRENCIES } from "../../constants";
import type { PriceState } from "../../types";

interface CurrencyCardProps {
  usd: PriceState;
}

const CurrencyCard = ({ usd }: CurrencyCardProps) => {
  return (
    <div className="currency-card">
      {CURRENCIES.map((currency) => (
        <PriceRow
          key={currency.code}
          symbol={currency.symbol}
          code={currency.code}
          label={currency.label}
          value={usd.value !== null ? usd.value * currency.rate : null}
          loading={usd.loading}
          error={usd.error}
          // decimals={currency.code === "USD" ? 0 : 3}
        />
      ))}
    </div>
  );
};

export default CurrencyCard;
