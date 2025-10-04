import Head from "next/head";
import { motion } from "framer-motion";

export default function BecomeTester() {
  return (
    <>
      <Head>
        <title>StreakTracker – Become a Tester</title>
        <meta
          name="description"
          content="Help shape StreakTracker – become a tester and get early access."
        />
      </Head>

      <main className="becomeTesterMain">
        <motion.h1
          className="becomeTesterTitle"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Become a StreakTracker Tester
        </motion.h1>

        <motion.p
          className="becomeTesterSubtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Join the early access program and help shape the future of
          StreakTracker!
        </motion.p>

        <motion.div
          className="becomeTesterStepsContainer"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.div
            className="becomeTesterStepBox"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="becomeTesterStepTitle">Step 1: Sign Up</h2>
            <p>
              Fill out the form with your email so I can unlock early access for
              you.
            </p>
            <a
              href="https://forms.gle/eVQ3HQuCVLrS6jYe6"
              target="_blank"
              rel="noopener noreferrer"
              className="becomeTesterLink"
            >
              ➤ Go to Sign-Up Form
            </a>
          </motion.div>

          <motion.div
            className="becomeTesterStepBox"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="becomeTesterStepTitle">Step 2: Get Access</h2>
            <p>
              After ~24 hours, you`ll receive a link to download the Early
              Access version of StreakTracker.
            </p>
          </motion.div>

          <motion.div
            className="becomeTesterStepBox"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="becomeTesterstepTitle">
              Step 3: Test and Share Feedback
            </h2>
            <p>
              Use the app and tell me what works, what doesn`t, and what you`d
              improve.
            </p>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
