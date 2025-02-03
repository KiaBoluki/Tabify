const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rtl bg-neutral-900/50 p-6 rounded-lg w-xl text-2xl">
      {children}
    </div>
  );
};

export default Card;
