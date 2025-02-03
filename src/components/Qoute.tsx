import { useState, useEffect } from "react";

// Function to fetch a random quote
async function getQuote() {
  const url = "https://api.realinspire.tech/v1/quotes/random";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch quote");
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching quote:", error);
    return null;
  }
}

const Quote = () => {
  const [quote, setQuote] = useState<{ content?: string; author?: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const data = await getQuote();
        if (data) {
            console.log(data);
            
          setQuote(data); // Set the quote data
        } else {
          setError("No quote found");
        }
      } catch (error) {
        setError("Failed to fetch quote");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchQuote();
  }, []); // Empty dependency array to run only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-6">
      {quote ? (
        <div className="text-white/75 font-fair">
          <p className="font-light text-lg">{quote.content}</p>
          <p className="italic font-thin text-sm">- {quote.author}</p>
        </div>
      ) : (
        <p>No quote available</p>
      )}
    </div>
  );
};

export default Quote;
