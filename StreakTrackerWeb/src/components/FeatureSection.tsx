"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useThemeProvider } from "@/context/ThemeProvider";
import MotionSection from "./MotionSection";
import MotionLinkButton from "./MotionLinkButton";

interface FeatureSectionProps {
  id?: string;
  /** true = Bild links, Text rechts | false = Text links, Bild rechts */
  imageLeft?: boolean;
  darkImage: string;
  lightImage: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonText: string;
  buttonColor: "blue" | "orange";
  buttonHref: string;
  buttonIcon: React.ReactNode;
  onButtonPress?: () => void;
}

export default function FeatureSection({
  id,
  imageLeft = true,
  darkImage,
  lightImage,
  imageAlt,
  title,
  description,
  buttonText,
  buttonColor,
  buttonHref,
  buttonIcon,
  onButtonPress,
}: FeatureSectionProps) {
  const { theme } = useThemeProvider();

  const imageBlock = (
    <motion.div
      className="featureImageContainer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Image
        src={theme === "dark" ? darkImage : lightImage}
        width={488}
        height={1032}
        alt={imageAlt}
      />
    </motion.div>
  );

  const textBlock = (
    <div className="featureSectionText">
      <motion.h2
        className="patrick-hand-regular"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {description}
      </motion.p>
      <MotionLinkButton
        color={buttonColor}
        text={buttonText}
        href={buttonHref}
        icon={buttonIcon}
        onPress={onButtonPress}
      />
    </div>
  );

  return (
    <MotionSection className="featureSection" id={id}>
      {imageLeft ? imageBlock : textBlock}
      {imageLeft ? textBlock : imageBlock}
    </MotionSection>
  );
}
