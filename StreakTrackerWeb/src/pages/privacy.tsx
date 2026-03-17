import Head from "next/head";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/Breadcrumb";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>StreakTracker – Privacy Policy</title>
        <meta name="description" content="Privacy Policy for StreakTracker" />
      </Head>

      <div className="legalPage">
        <Breadcrumb current="Privacy Policy" />
        <motion.h1
          className="patrick-hand-regular legalTitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Privacy Policy
        </motion.h1>

        <motion.p
          className="legalMeta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Last updated: March 2026
        </motion.p>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            1. General
          </h2>
          <p>
            StreakTracker was built with privacy as a core principle. The app
            operates entirely on your device — no accounts, no cloud sync, no
            external servers. All your streaks, goals, and habits are stored{" "}
            <strong>only locally on your device</strong> and are never
            transmitted anywhere.
          </p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            2. Data Controller
          </h2>
          <p>
            Sebastian Falter
            <br />
            Email:{" "}
            <a href="mailto:seb.falter@gmail.com" className="legalLink">
              seb.falter@gmail.com
            </a>
          </p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            3. Data Collected
          </h2>
          <p>
            StreakTracker does <strong>not</strong> collect, store, or process
            any personal data. Specifically:
          </p>
          <ul className="legalList">
            <li>No name, email address, or user account is created</li>
            <li>No location, device identifiers, or usage analytics are collected</li>
            <li>No data is transmitted to any server</li>
            <li>No third-party analytics or advertising SDKs are used</li>
          </ul>
          <p>
            All data you enter into the app (streak names, check-ins, settings)
            is stored exclusively in the local storage of your device using
            AsyncStorage.
          </p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            4. PIN Lock &amp; Biometrics
          </h2>
          <p>
            If you choose to enable the optional PIN lock or biometric
            authentication, these credentials are stored exclusively on your
            device in its secure local storage. The PIN is never sent to any
            server and is only processed locally to unlock the app.
          </p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            5. Push Notifications
          </h2>
          <p>
            StreakTracker can send local push notifications to remind you of
            your daily habits. These notifications are scheduled locally on your
            device through the operating system. No notification data is
            transmitted to external servers.
          </p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            6. This Website
          </h2>
          <p>
            This website (streaktracker.app) is a static informational page and
            does not use cookies, tracking pixels, or analytics tools. No
            personal data is collected when you browse this website.
          </p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            7. Your Rights (GDPR)
          </h2>
          <p>
            Under the General Data Protection Regulation (GDPR), you have the
            following rights regarding your personal data:
          </p>
          <ul className="legalList">
            <li>Right to access (Art. 15 GDPR)</li>
            <li>Right to rectification (Art. 16 GDPR)</li>
            <li>Right to erasure (Art. 17 GDPR)</li>
            <li>Right to restriction of processing (Art. 18 GDPR)</li>
            <li>Right to data portability (Art. 20 GDPR)</li>
            <li>Right to object (Art. 21 GDPR)</li>
          </ul>
          <p>
            Since StreakTracker does not collect any personal data, these rights
            are satisfied by design. You can delete all app data at any time by
            uninstalling the app.
          </p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            8. Contact
          </h2>
          <p>
            If you have any questions about this privacy policy, feel free to
            reach out:{" "}
            <a href="mailto:seb.falter@gmail.com" className="legalLink">
              seb.falter@gmail.com
            </a>
          </p>
        </motion.section>
      </div>
    </>
  );
}
