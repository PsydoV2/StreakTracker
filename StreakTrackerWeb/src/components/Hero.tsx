"use client";

import { useThemeProvider } from "@/context/ThemeProvider";
import Image from "next/image";
import { motion } from "framer-motion";
import MotionSection from "./MotionSection";

export default function Hero() {
  const { theme } = useThemeProvider();

  return (
    <MotionSection className={"heroSection"}>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6 }}
        className={"imageWrapper"}
      >
        <Image
          src={
            theme === "dark"
              ? "/HandyImages/HeroShotDark.png"
              : "/HandyImages/HeroShotLight.png"
          }
          alt="Streak Tracker App"
          width={173}
          height={216}
          priority
        />
      </motion.div>

      <motion.h1
        className={"heroTitle patrick-hand-regular"}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Build better habits – one day at a time
      </motion.h1>

      <motion.p
        className={"heroSubtitle"}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        StreakTracker helps you stay consistent, celebrate your progress,
        <br />
        and never lose momentum again.
      </motion.p>

      <motion.div
        className={"ctaWrapper"}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.a
          className={"primaryButton patrick-hand-regular"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#becomeTester"
        >
          Register as app tester
        </motion.a>

        <motion.a
          className={"secondaryButton patrick-hand-regular"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#firstFeature"
        >
          Explore Features
        </motion.a>
      </motion.div>

      <motion.div
        className={"trustRow"}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        🔥 <strong className="space-mono-regular">12,000+</strong> habits
        tracked &nbsp; | &nbsp; ✅
        <strong className="space-mono-regular"> 95%</strong> user satisfaction
      </motion.div>
    </MotionSection>
  );
}
