"use client";

import Image from "next/image";
import MotionSection from "./MotionSection";
import { useThemeProvider } from "@/context/ThemeProvider";
import { motion } from "framer-motion";
import { FaGlobe } from "react-icons/fa6";
import MotionLinkButton from "./MotionLinkButton";

export default function OptionSection() {
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
          Made for everyone
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Streak Tracker speaks your language – literally. Choose from multiple
          languages and make building habits feel right at home.
        </motion.p>

        <MotionLinkButton
          text="View Language Options"
          icon={<FaGlobe />}
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
              ? "/HandyImages/OptionScreenDark.png"
              : "/HandyImages/OptionScreenLight.png"
          }
          width={488}
          height={1032}
          alt="Archived Streaks"
        />
      </motion.div>
    </MotionSection>
  );
}
