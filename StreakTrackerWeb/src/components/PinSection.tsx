"use client";

import Image from "next/image";
import MotionSection from "./MotionSection";
import { useThemeProvider } from "@/context/ThemeProvider";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa6";
import MotionLinkButton from "./MotionLinkButton";

export default function PinSection() {
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
              ? "/HandyImages/PinScreenDark.png"
              : "/HandyImages/PinScreenLight.png"
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
          Lock it with a PIN
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Keep your streaks private and protected with an optional PIN lock.
          Your goals are personal – and now, they stay that way.
        </motion.p>

        <MotionLinkButton
          color="blue"
          text="Enable PIN Protection"
          href="#becomeTester"
          icon={<FaLock />}
        ></MotionLinkButton>
      </div>
    </MotionSection>
  );
}
