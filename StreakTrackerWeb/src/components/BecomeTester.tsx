"use client";

import { FaFlaskVial } from "react-icons/fa6";
import MotionLinkButton from "./MotionLinkButton";
import MotionSection from "./MotionSection";
import { motion } from "framer-motion";
import { GrGroup } from "react-icons/gr";

export default function BecomeTester() {
  return (
    <MotionSection className="becomeTesterSection" id="becomeTester">
      <div className="becomeTesterWrapper">
        <GrGroup id="becomeTesterBackgroundIcon" />

        <motion.h2
          className="title patrick-hand-regular"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Become a Tester
        </motion.h2>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          Help shape the future of StreakTracker by testing early versions. No
          account needed – just your honest feedback.
        </motion.p>

        <MotionLinkButton
          color="blue"
          icon={<FaFlaskVial />}
          text="Sign up as Tester"
          href="/becomeTester"
        ></MotionLinkButton>
      </div>
    </MotionSection>
  );
}
