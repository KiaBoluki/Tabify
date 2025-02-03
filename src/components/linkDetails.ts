// linkDetails.ts
export interface DetailsProps {
  url: string;
  text: string;
  icon: string;
}

export const LINK_DETAILS: Record<string, DetailsProps> = {
  youtube: {
    url: "https://youtube.com",
    icon: "src/assets/images/youtube.svg",
    text: "YouTube",
  },
  gmail: {
    url: "https://gmail.com",
    icon: "src/assets/images/envelope.svg",
    text: "Gmail",
  },
  x: {
    url: "https://x.com",
    icon: "src/assets/images/twitter.svg",
    text: "X",
  },
  telegram: {
    url: "https://web.telegram.org",
    icon: "src/assets/images/telegram.svg",
    text: "Telegram",
  },
  whatsapp: {
    url: "https://web.whatsapp.com",
    icon: "src/assets/images/whatsapp.svg",
    text: "Whatsapp",
  },
};