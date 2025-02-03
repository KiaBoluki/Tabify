import React, { useState, useEffect } from "react";
import { LINK_DETAILS, DetailsProps } from "./linkDetails";
interface LinkProps {
  to: string;
}

const Link: React.FC<LinkProps> = ({ to }) => {
  const [details, setDetails] = useState<DetailsProps | null>(null);

  useEffect(() => {
    // Set details based on the `to` prop
    if (LINK_DETAILS[to]) {
      setDetails(LINK_DETAILS[to]);
    } else {
      setDetails(null); // Handle unknown links
    }
  }, []);

  if (!details) {
    return null; // Return nothing if details are not found
  }

  return (
    <a
      href={details.url}
      className="flex items-center space-x-2 border-b-2 border-b-transparent transition duration-500 text-center p-2 hover:border-b-white"
    >
      <img
        src={details.icon}
        alt={details.text}
        className="w-5 h-5 object-contain inline-block align-middle"
      />
      <span className="inline-block align-middle">{details.text}</span>
    </a>
  );
};

export default Link;
