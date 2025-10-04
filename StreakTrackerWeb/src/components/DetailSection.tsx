"use client";

import Image from "next/image";
import MotionSection from "./MotionSection";
import { useThemeProvider } from "@/context/ThemeProvider";
import { motion } from "framer-motion";
import { FaChartBar } from "react-icons/fa6";
import MotionLinkButton from "./MotionLinkButton";

export default function DetailSection() {
  const { theme } = useThemeProvider();

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
              ? "/HandyImages/DetailsScreenDark.png"
              : "/HandyImages/DetailsScreenLight.png"
          }
          width={488}
          height={1032}
          alt="PIN Lock Feature"
        />
      </motion.div>

      <div className="featureSectionText">
        <motion.h2
          className="patrick-hand-regular"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          See your progress at a glance
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Open a detailed view for each streak and explore your weekly activity,
          records, and tracking history. Stay motivated by seeing how far you’ve
          come.
        </motion.p>

        <MotionLinkButton
          color="blue"
          text="Open Streak Details"
          href="#becomeTester"
          icon={<FaChartBar />}
        ></MotionLinkButton>
      </div>
    </MotionSection>
  );
}
