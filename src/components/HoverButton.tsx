import { ChildrenProps } from "@/types";
import { motion, MotionProps } from "framer-motion";

export const HoverButton = ({
  children,
  ...props
}: ChildrenProps & MotionProps) => (
  <motion.button
    className="btn"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.9 }}
    {...props}
  >
    {children}
  </motion.button>
);
