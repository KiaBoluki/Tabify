import React , { useState, useEffect } from "react";
interface LinkProps {
    to: string; 
}

const Link: React.FC<LinkProps> =  ({to}) => {
    const [text, setText] = useState('');
    const [url, setUrl] = useState("#"); 
    useEffect(()=>{
       switch (to) {
         case "youtube":
           setText("YouTube");
           setUrl("https://youtube.com");
           break;
         case "gmail":
           setText("Gmail");
           setUrl("https://gmail.com");
           break;
         case "x":
           setText("X");
           setUrl("https://X.com");
           break;

         case "telegram":
           setText("Telegram");
           setUrl("https://web.telegram.org");
           break;

         case "whatsapp":
           setText("Whatsapp");
           setUrl("https://web.whatsapp.com");
           break;

         default:
           break;
       }
    }, [to]); 

    return (
      <a
        href={url}
        className="inline-block border-b-2 border-b-transparent transition duration-500 w-full text-center p-2 hover:text-amber-400 hover:border-b-amber-400"
      >
        {text}
      </a>
    ); 
}

export default Link;
