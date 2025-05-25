import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface Props {
  Icon: IconType;
  title: string;
  color: string;
  to: string;
}

const Menu = ({ Icon, title, color, to }: Props) => {
  return (
    <Link to={to} className="text-center">
      <div
        className={`rounded-lg w-[80px] hover:opacity-70 cursor-pointer shadow-lg h-[80px] bg-gradient-to-tr flex justify-center ${color} items-center p-4`}
      >
        <Icon className="text-5xl text-white" />
      </div>
      <p className="mt-2 font-bold text-lg">{title}</p>
    </Link>
  );
};

export default Menu;
