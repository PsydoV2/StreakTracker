import Head from "next/head";
import { motion } from "framer-motion";
import { FaLock, FaMobileAlt, FaUserSecret } from "react-icons/fa";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>StreakTracker Privacy</title>
        <meta name="description" content="Privacy Policy for StreakTracker" />
      </Head>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "4rem 1rem",
          minHeight: "calc(100vh - 120px)",
        }}
      >
        <motion.h2
          className="patrick-hand-regular"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "2rem",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Your Privacy Matters 🛡️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontSize: "1.125rem",
            marginBottom: "1.5rem",
            lineHeight: "1.6",
          }}
        >
          StreakTracker was built with privacy in mind – from the very first
          line of code. All your streaks, goals, and habits are stored{" "}
          <strong>only on your device</strong>. We do <strong>not</strong>{" "}
          collect any personal data, and we never will.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontSize: "1.125rem",
            marginBottom: "1.5rem",
            lineHeight: "1.6",
          }}
        >
          <FaLock style={{ marginRight: "0.5rem" }} />
          You can optionally secure your data with a local PIN lock. This PIN is
          stored only on your phone and is never sent or synced anywhere.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontSize: "1.125rem",
            marginBottom: "1.5rem",
            lineHeight: "1.6",
          }}
        >
          <FaMobileAlt style={{ marginRight: "0.5rem" }} />
          There`s no account, no cloud sync, and no hidden trackers. What
          happens in your app stays in your app.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontSize: "1.125rem",
            marginBottom: "1.5rem",
            lineHeight: "1.6",
          }}
        >
          <FaUserSecret style={{ marginRight: "0.5rem" }} />
          If you ever have questions about privacy, feel free to contact me:{" "}
          <a href="mailto:seb.falter@gmail.com">seb.falter@gmail.com</a>
        </motion.p>
      </div>
    </>
  );
}
