// linkDetails.ts
export interface DetailsProps {
  url: string;
  text: string;
  icon: string;
}

export const LINK_DETAILS: Record<string, DetailsProps> = {
  youtube: {
    url: "https://youtube.com",
    icon: "images/youtube.svg",
    text: "YouTube",
  },
  gmail: {
    url: "https://gmail.com",
    icon: "images/envelope.svg",
    text: "Gmail",
  },
  x: {
    url: "https://x.com",
    icon: "images/twitter.svg",
    text: "X",
  },
  telegram: {
    url: "https://web.telegram.org",
    icon: "images/telegram.svg",
    text: "Telegram",
  },
  whatsapp: {
    url: "https://web.whatsapp.com",
    icon: "images/whatsapp.svg",
    text: "Whatsapp",
  },
};