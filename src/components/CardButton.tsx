type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  data: [string, string, string];
  className?: string;
};

export const CardButton = ({ className, onClick, data }: Props) => {
  return (
    <button onClick={onClick} className={`btn-card ${className}`}>
      {data.map((el, idx) => (
        <span key={idx} className="col-auto text-center">
          {el}
        </span>
      ))}
    </button>
  );
};
