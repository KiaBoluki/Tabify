import { useState, useEffect } from "react";

function setLocalStorage(data: {author: string, authorSlug: string, content: string, fetchedAt: null|string, length: number }) {
  data.fetchedAt = new Date().valueOf().toString();
  localStorage.setItem("tabify-qoute", JSON.stringify(data));
}

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
  const [quote, setQuote] = useState<{
    content?: string;
    author?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const oldQoute = localStorage.getItem("tabify-qoute");
    // if (oldQoute) {
    //   const fetchedAt = JSON.parse(oldQoute).fetchedAt;
    //   const currentTime = new Date().valueOf(); 
      // if ( currentTime - fetchedAt < 60 * 60 * 1000 )
      // {
      //   setQuote(JSON.parse(oldQoute)); 
      //   setLoading(false); 
      //   return ; 
      // }
    // }
    const fetchQuote = async () => {
      try {
        const data = await getQuote();
        setLocalStorage(data);
        if (data) {
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
        <div className="text-white font-fair text-sm">
          <p className="font-thin">{quote.content}</p>
          <p className="italic font-thin">- {quote.author}</p>
        </div>
      ) : (
        <p>No quote available</p>
      )}
    </div>
  );
};

export default Quote;
