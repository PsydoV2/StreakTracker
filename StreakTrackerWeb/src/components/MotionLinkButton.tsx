"use client";

interface Props {
  text: string | React.ReactNode;
  icon: React.ReactNode;
  color: "blue" | "orange";
  href: string;
  onPress?: () => void;
  newTab?: boolean;
}

import { motion } from "framer-motion";
import Link from "next/link";

export default function MotionLinkButton(props: Props) {
  return (
    <Link href={props.href} target={props.newTab ? "_blank" : ""}>
      <motion.div
        className={
          props.color === "blue"
            ? "motionButton motionButtonBlue"
            : "motionButton motionButtonOrange"
        }
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={props.onPress}
      >
        {props.icon} {props.text}
      </motion.div>
    </Link>
  );
}
