"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const underlineVariants = {
  initial: { width: 0 },
  hover: { width: "100%" },
};

function AnimatedLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href}>
      <motion.div
        className="footerLinkWrapper"
        initial="initial"
        whileHover="hover"
        animate="initial"
      >
        <span className="footerLinkText">{label}</span>
        <motion.div
          className="footerLinkUnderline"
          variants={underlineVariants}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="footerSection">
      <div className="footerContent">
        <div
          className="footerLogo"
          onClick={() => (window.location.href = "/")}
        >
          <Image src="/logo.png" width={50} height={50} alt="Logo" />
          <h3 className="patrick-hand-regular">StreakTracker</h3>
        </div>

        <div className="footerLinksRow">
          <AnimatedLink href="/imprint" label="Imprint" />
          <AnimatedLink href="/privacy" label="Privacy" />
          <AnimatedLink href="/" label="Home" />
          <AnimatedLink href="/#firstFeature" label="Features" />
          <AnimatedLink href="/#becomeTester" label="Become Tester" />
        </div>
      </div>
    </footer>
  );
}
