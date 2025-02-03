const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-vazir bg-neutral-900/50 p-6 rounded-lg w-xl text-2xl hover:bg-neutral-900/80 hover:-translate-y-4 hover:scale-105 transition-all duration-330 ">
      {children}
    </div>
  );
};

export default Card;
