import { useQuote } from "../../hooks/useQuote";

const QuoteCard = () => {
  const { quote, loading, error } = useQuote();

  if (error) return null;

  return (
    <div className="quote-card">
      <span className="quote-card__mark">"</span>
      {loading ? (
        <div className="quote-card__loading">
          <div className="quote-card__shimmer" />
          <div className="quote-card__shimmer quote-card__shimmer--short" />
        </div>
      ) : quote ? (
        <>
          <p className="quote-card__content">{quote.content}</p>
          <p className="quote-card__author">— {quote.author}</p>
        </>
      ) : null}
    </div>
  );
};

export default QuoteCard;
