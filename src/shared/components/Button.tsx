import { motion } from "framer-motion";
import { Colors, Sizes } from "../Enums/Stylings";

interface IProps {
  children: React.ReactNode;
  onClick?: (e?:any) => void;
  bgColor?: Colors;
  textColor?: Colors;
  className?: string;
  size?: Sizes;
  type?: "submit" | "reset" | "button";
  animated?: boolean;  // for animated button effect (hover effect)
}

function Button({ children, onClick, bgColor,textColor,type, size, className,animated }: IProps) {
  
  if(!className) className = "font-inter font-bold w-fit px-16 py-2 rounded-xl"
  let duration = null;
  let scale:any = null;
  if(animated){
    duration = 0.3;
    scale = [null, 1.2, 1.1]
  }

  return (
    <motion.div whileHover={{ scale: scale }}
    transition={{ duration: duration }} onClick={onClick}>
    <button
      type={type}
      className={
        'bg-'+bgColor+'text-'+textColor+'text-'+size+className
      }
    >
      {children}
    </button></motion.div>
  );
}

export default Button;
