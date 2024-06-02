const Button = ({ className, title, onClick, type }) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {title}
    </button>
  );
};

export default Button;
