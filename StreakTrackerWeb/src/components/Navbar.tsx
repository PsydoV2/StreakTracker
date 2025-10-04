"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaMoon, FaRegSun } from "react-icons/fa6";
import { useThemeProvider } from "@/context/ThemeProvider";

export default function Navbar() {
  const { theme, setTheme } = useThemeProvider();

  return (
    <nav className="navbar">
      <div className="logo">
        <Image src={"/logo.png"} width={60} height={60} alt="Logo"></Image>
        <h3 className="patrick-hand-regular">StreakTracker</h3>
      </div>

      <motion.a
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        href="#services"
        className="navLink"
      >
        Services
      </motion.a>
      <motion.a
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        href="#services"
        className="navLink"
      >
        Services
      </motion.a>
      <motion.a
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        href="#services"
        className="navLink"
      >
        Services
      </motion.a>

      {theme === "dark" ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => setTheme("light")}
        >
          <FaRegSun />
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => setTheme("dark")}
        >
          <FaMoon />
        </motion.button>
      )}
    </nav>
  );
}
