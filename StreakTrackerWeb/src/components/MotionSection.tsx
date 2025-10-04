"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface MotionSectionProps {
  children?: ReactNode;
  className?: string;
  id?: string;
}

export default function MotionSection({
  children,
  className,
  id,
}: MotionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.6 }}
      className={className}
      id={id}
    >
      {children}
    </motion.section>
  );
}
