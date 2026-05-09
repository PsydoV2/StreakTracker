"use client";

import { motion } from "framer-motion";
import MotionSection from "./MotionSection";
import {
  FaMoon,
  FaBell,
  FaBookOpen,
  FaFaceSmile,
  FaInfinity,
  FaShieldHalved,
} from "react-icons/fa6";

const FEATURES = [
  {
    icon: <FaMoon />,
    title: "Light & Dark Theme",
    description: "Instant theme switching that matches your environment and remembers your preference.",
  },
  {
    icon: <FaBell />,
    title: "Daily Reminders",
    description: "Scheduled morning and evening notifications keep you consistent without the friction.",
  },
  {
    icon: <FaBookOpen />,
    title: "Guided Onboarding",
    description: "A clear, welcoming intro gets you set up in seconds and ready to build your first habit.",
  },
  {
    icon: <FaFaceSmile />,
    title: "Custom Emojis",
    description: "Give every streak its own personality with the built-in emoji picker.",
  },
  {
    icon: <FaInfinity />,
    title: "Unlimited Habits",
    description: "No caps, no subscriptions. Create as many streaks as you want.",
  },
  {
    icon: <FaShieldHalved />,
    title: "Offline & Private",
    description: "No account, no cloud sync. All your data lives on your device — always.",
  },
];

export default function FeaturesHighlights() {
  return (
    <MotionSection className="featuresHighlightsSection">
      <motion.h2
        className="featuresHighlightsTitle patrick-hand-regular"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Everything you need to build better habits
      </motion.h2>

      <div className="featuresHighlightsGrid">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="featureHighlightCard"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <div className="featureHighlightIcon">{feature.icon}</div>
            <div className="featureHighlightCardBody">
              <h3 className="featureHighlightCardTitle patrick-hand-regular">
                {feature.title}
              </h3>
              <p className="featureHighlightCardDesc">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </MotionSection>
  );
}
