import { ChildrenProps } from "@/types";
import { motion, MotionProps } from "framer-motion";
import React from "react";

export const HoverButton = ({
  children,
  onClick,
  type = "button",
  ...props
}: ChildrenProps &
  MotionProps & {
    type?: "button" | "submit";
    onClick?: React.EventHandler<React.SyntheticEvent<HTMLButtonElement>>;
  }) => (
  <motion.button
    type={type}
    onClick={onClick}
    className="btn"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.9 }}
    {...props}
  >
    {children}
  </motion.button>
);
