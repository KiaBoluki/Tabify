const Card = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="bg-neutral-900/50 p-6 rounded-lg " >
        { children }
    </div>
  );
};

export default Card;