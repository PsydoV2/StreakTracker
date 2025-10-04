"use client";

import Image from "next/image";
import MotionSection from "./MotionSection";
import { useThemeProvider } from "@/context/ThemeProvider";
import { motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa6";
import MotionLinkButton from "./MotionLinkButton";

export default function ThemeSection() {
  const { theme, setTheme } = useThemeProvider();

  return (
    <MotionSection className="featureSection" id="firstFeature">
      <motion.div
        className="featureImageContainer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Image
          src={
            theme === "dark"
              ? "/HandyImages/PinScreenDark.png"
              : "/HandyImages/PinScreenLight.png"
          }
          width={488}
          height={1032}
          alt="DarkLightMode"
        ></Image>
      </motion.div>
      <div className="featureSectionText">
        <motion.h2
          className="patrick-hand-regular"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Light & Dark Theme
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Whether you’re tracking your streaks in sunlight or moonlight – choose
          the theme that fits your vibe. Instantly switch between light and dark
          mode.
        </motion.p>

        <MotionLinkButton
          text="Toggle Theme"
          icon={theme === "dark" ? <FaSun /> : <FaMoon />}
          color="blue"
          onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
          href="#firstFeature"
        ></MotionLinkButton>
      </div>
    </MotionSection>
  );
}
