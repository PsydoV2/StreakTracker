"use client";

import Head from "next/head";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import BecomeTester from "@/components/BecomeTester";
import { useThemeProvider } from "@/context/ThemeProvider";
import {
  FaMoon,
  FaSun,
  FaFireFlameCurved,
  FaLock,
  FaBoxArchive,
  FaChartBar,
  FaGlobe,
} from "react-icons/fa6";

export default function Home() {
  const { theme, setTheme } = useThemeProvider();

  return (
    <>
      <Head>
        <title>StreakTracker – Build better habits</title>
        <meta
          name="description"
          content="StreakTracker helps you stay consistent, celebrate your progress, and never lose momentum again."
        />
      </Head>

      <Hero />

      {/* Bild links, Text rechts – blauer Button */}
      <FeatureSection
        id="theme"
        imageLeft={true}
        darkImage="/HandyImages/PinScreenDark.png"
        lightImage="/HandyImages/PinScreenLight.png"
        imageAlt="Light & Dark Theme"
        title="Light & Dark Theme"
        description="Whether you're tracking your streaks in sunlight or moonlight – choose the theme that fits your vibe. Instantly switch between light and dark mode."
        buttonText="Toggle Theme"
        buttonColor="blue"
        buttonHref="#theme"
        buttonIcon={theme === "dark" ? <FaSun /> : <FaMoon />}
        onButtonPress={() => setTheme(theme === "dark" ? "light" : "dark")}
      />

      {/* Text links, Bild rechts – oranger Button */}
      <FeatureSection
        id="streaks"
        imageLeft={false}
        darkImage="/HandyImages/HomeScreenDark.png"
        lightImage="/HandyImages/HomeScreenLight.png"
        imageAlt="Unlimited Streaks"
        title="Unlimited Streaks"
        description="Track habits big or small – there's no limit to what you can build."
        buttonText="Create Your First Streak"
        buttonColor="orange"
        buttonHref="#becomeTester"
        buttonIcon={<FaFireFlameCurved />}
      />

      {/* Bild links, Text rechts – blauer Button */}
      <FeatureSection
        id="pin"
        imageLeft={true}
        darkImage="/HandyImages/PinScreenDark.png"
        lightImage="/HandyImages/PinScreenLight.png"
        imageAlt="PIN Lock Feature"
        title="Lock it with a PIN"
        description="Keep your streaks private and protected with an optional PIN lock. Your goals are personal – and now, they stay that way."
        buttonText="Enable PIN Protection"
        buttonColor="blue"
        buttonHref="#becomeTester"
        buttonIcon={<FaLock />}
      />

      {/* Text links, Bild rechts – oranger Button */}
      <FeatureSection
        id="archive"
        imageLeft={false}
        darkImage="/HandyImages/ArchiveScreenDark.png"
        lightImage="/HandyImages/ArchiveScreenLight.png"
        imageAlt="Archive Feature"
        title="Archive Your Streaks"
        description="Pause habits without losing your progress. Archived streaks stay saved and can be reactivated anytime – fully reset or continued."
        buttonText="Try Archive Feature"
        buttonColor="orange"
        buttonHref="#becomeTester"
        buttonIcon={<FaBoxArchive />}
      />

      {/* Bild links, Text rechts – blauer Button */}
      <FeatureSection
        id="stats"
        imageLeft={true}
        darkImage="/HandyImages/DetailsScreenDark.png"
        lightImage="/HandyImages/DetailsScreenLight.png"
        imageAlt="Streak Statistics"
        title="See your progress at a glance"
        description="Open a detailed view for each streak and explore your weekly activity, records, and tracking history. Stay motivated by seeing how far you've come."
        buttonText="Open Streak Details"
        buttonColor="blue"
        buttonHref="#becomeTester"
        buttonIcon={<FaChartBar />}
      />

      {/* Text links, Bild rechts – oranger Button */}
      <FeatureSection
        id="options"
        imageLeft={false}
        darkImage="/HandyImages/OptionScreenDark.png"
        lightImage="/HandyImages/OptionScreenLight.png"
        imageAlt="Language Options"
        title="Made for everyone"
        description="Streak Tracker speaks your language – literally. Choose from multiple languages and make building habits feel right at home."
        buttonText="View Language Options"
        buttonColor="orange"
        buttonHref="#becomeTester"
        buttonIcon={<FaGlobe />}
      />

      <BecomeTester />
    </>
  );
}
