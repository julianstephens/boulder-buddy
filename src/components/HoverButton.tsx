import { ChildrenProps } from "@/types";
import { motion, MotionProps } from "framer-motion";

export const HoverButton = ({
  children,
  ...props
}: ChildrenProps & MotionProps) => (
  <motion.button className="btn" whileHover={{ scale: 1.05 }} {...props}>
    {children}
  </motion.button>
);
