"use client";

import Head from "next/head";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import FeaturesHighlights from "@/components/FeaturesHighlights";
import BecomeTester from "@/components/BecomeTester";
import {
  FaRotate,
  FaFingerprint,
  FaBoxArchive,
  FaChartBar,
  FaGlobe,
} from "react-icons/fa6";

export default function Home() {
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

      {/* Custom cycle intervals */}
      <FeatureSection
        id="cycles"
        imageLeft={false}
        darkImage="/HandyImages/HomeScreenDark.png"
        lightImage="/HandyImages/HomeScreenLight.png"
        imageAlt="Custom cycle intervals"
        title="Your pace, your rules"
        description="Not every habit works on a daily schedule. Set each streak to its own rhythm — daily, every few days, weekly, or monthly. Or dial in a fully custom interval that fits your life exactly."
        buttonText="Set Your Rhythm"
        buttonColor="orange"
        buttonHref="#becomeTester"
        buttonIcon={<FaRotate />}
      />

      {/* PIN + Biometric */}
      <FeatureSection
        id="pin"
        imageLeft={true}
        darkImage="/HandyImages/PinScreenDark.png"
        lightImage="/HandyImages/PinScreenLight.png"
        imageAlt="PIN & Biometric Lock"
        title="Lock it down"
        description="Protect your habits with an optional 4-digit PIN or biometric authentication — Face ID and fingerprint supported. Your progress stays private, always."
        buttonText="Enable PIN Protection"
        buttonColor="blue"
        buttonHref="#becomeTester"
        buttonIcon={<FaFingerprint />}
      />

      {/* Archive */}
      <FeatureSection
        id="archive"
        imageLeft={false}
        darkImage="/HandyImages/ArchiveScreenDark.png"
        lightImage="/HandyImages/ArchiveScreenLight.png"
        imageAlt="Archive Feature"
        title="Never lose a streak"
        description="Life happens. Archive a habit when you need a break — your stats, history, and record stay saved. Restart it whenever you're ready, fully reset or from where you left off."
        buttonText="Explore Archive"
        buttonColor="orange"
        buttonHref="#becomeTester"
        buttonIcon={<FaBoxArchive />}
      />

      {/* Stats */}
      <FeatureSection
        id="stats"
        imageLeft={true}
        darkImage="/HandyImages/DetailsScreenDark.png"
        lightImage="/HandyImages/DetailsScreenLight.png"
        imageAlt="Streak Statistics"
        title="See how far you've come"
        description="Open the details view for any habit and explore your activity heatmap, current streak, personal best, and total completions — all in one place."
        buttonText="View Streak Stats"
        buttonColor="blue"
        buttonHref="#becomeTester"
        buttonIcon={<FaChartBar />}
      />

      {/* Languages */}
      <FeatureSection
        id="languages"
        imageLeft={false}
        darkImage="/HandyImages/OptionScreenDark.png"
        lightImage="/HandyImages/OptionScreenLight.png"
        imageAlt="Language Options"
        title="Made for everyone"
        description="StreakTracker speaks your language — literally. Choose from 8 languages including English, German, Spanish, French, Italian, Turkish, Portuguese, and Japanese."
        buttonText="View Language Options"
        buttonColor="orange"
        buttonHref="#becomeTester"
        buttonIcon={<FaGlobe />}
      />

      <FeaturesHighlights />

      <BecomeTester />
    </>
  );
}
