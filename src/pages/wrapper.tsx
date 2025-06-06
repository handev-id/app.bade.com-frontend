import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import useStore from "../utils/use-store";

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

type Props = {
  children: ReactNode;
  title: string;
  component?: () => React.ReactNode;
};

const Wrapper = ({ children, title, component }: Props) => {
  const [mount, setMount] = useState(false);
  const setHeader = useStore((state) => state.setHeader);

  useEffect(() => {
    setHeader({
      title,
      component,
    });

    document.title = title;

    setMount(true);
  }, []);

  if (!mount) return null;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default Wrapper;
