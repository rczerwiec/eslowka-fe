import { Colors, Sizes } from "../Enums/Stylings";

interface IProps {
  children: React.ReactNode;
  onClick?: (e?:any) => void;
  bgColor?: Colors;
  textColor?: Colors;
  className?: string;
  size?: Sizes;
  type?: "submit" | "reset" | "button";
}

function Button({ children, onClick, bgColor,textColor,type, size, className }: IProps) {
  
  if(!className) className = "font-inter font-bold w-fit px-16 py-2 rounded-xl"

  return (
    <button
      onClick={onClick}
      type={type}
      className={
        'bg-'+bgColor+'text-'+textColor+'text-'+size+className
      }
    >
      {children}
    </button>
  );
}

export default Button;
