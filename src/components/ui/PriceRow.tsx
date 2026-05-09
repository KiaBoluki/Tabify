import Spinner from "./Spinner";

interface PriceRowProps {
  symbol: string;
  code: string;
  label: string;
  value: number | null;
  loading: boolean;
  error: boolean;
  decimals?: number;
}

function formatPrice(value: number): string {
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

const PriceRow = ({
  symbol,
  code,
  label,
  value,
  loading,
  error,
}: PriceRowProps) => {
  
  return (
    <div className="price-row">
      <div className="price-row__left">
        <span className="price-row__symbol">{symbol}</span>
        <div className="price-row__labels">
          <span className="price-row__code">{code}</span>
          <span className="price-row__label">{label}</span>
        </div>
      </div>

      <div className="price-row__right">
        {error && !loading ? (
          <span className="price-row__error">—</span>
        ) : (
          <span className="price-row__value">
            {value !== null ? formatPrice(value) : "···"}
            {loading && <Spinner size={10} />}
          </span>
        )}
        <span className="price-row__unit">تومان</span>
      </div>
    </div>
  );
};

export default PriceRow;
