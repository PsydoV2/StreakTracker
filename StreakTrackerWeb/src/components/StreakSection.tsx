"use client";

import Image from "next/image";
import MotionSection from "./MotionSection";
import { useThemeProvider } from "@/context/ThemeProvider";
import { motion } from "framer-motion";
import { FaFireFlameCurved } from "react-icons/fa6";
import MotionLinkButton from "./MotionLinkButton";

export default function StreakSection() {
  const { theme } = useThemeProvider();

  return (
    <MotionSection className="featureSection">
      <div className="featureSectionText">
        <motion.h2
          className="patrick-hand-regular"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Unlimited Streaks
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Track habits big or small – there’s no limit to what you can build.
        </motion.p>

        <MotionLinkButton
          text="Create Your First Streak"
          icon={<FaFireFlameCurved />}
          color="orange"
          href="#becomeTester"
        ></MotionLinkButton>
      </div>
      <motion.div
        className="featureImageContainer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Image
          src={
            theme === "dark"
              ? "/HandyImages/HomeScreenDark.png"
              : "/HandyImages/HomeScreenLight.png"
          }
          width={488}
          height={1032}
          alt="DarkLightMode"
        ></Image>
      </motion.div>
    </MotionSection>
  );
}
