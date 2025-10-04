"use client";

import Image from "next/image";
import MotionSection from "./MotionSection";
import { useThemeProvider } from "@/context/ThemeProvider";
import { motion } from "framer-motion";
import { FaBoxArchive } from "react-icons/fa6";
import MotionLinkButton from "./MotionLinkButton";

export default function ArchiveSection() {
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
          Archive Your Streaks
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Pause habits without losing your progress. Archived streaks stay saved
          and can be reactivated anytime – fully reset or continued.
        </motion.p>

        <MotionLinkButton
          text="Try Archive Feature"
          icon={<FaBoxArchive />}
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
              ? "/HandyImages/ArchiveScreenDark.png"
              : "/HandyImages/ArchiveScreenLight.png"
          }
          width={488}
          height={1032}
          alt="Archived Streaks"
        />
      </motion.div>
    </MotionSection>
  );
}
