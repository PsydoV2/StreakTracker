import Head from "next/head";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

export default function Terms() {
  return (
    <>
      <Head>
        <title>StreakTracker – Terms of Service</title>
        <meta name="description" content="Terms of Service for StreakTracker" />
      </Head>

      <div className="legalPage">
        <Breadcrumb current="Terms of Service" />
        <motion.h1
          className="patrick-hand-regular legalTitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Terms of Service
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
            1. Acceptance of Terms
          </h2>
          <p>
            By downloading, installing, or using StreakTracker (&quot;the
            App&quot;), you agree to be bound by these Terms of Service. If you
            do not agree to these terms, please do not use the App.
          </p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            2. Description of the App
          </h2>
          <p>
            StreakTracker is a habit-tracking application developed and
            maintained by Sebastian Falter. The App allows users to create,
            track, and manage personal habits and streaks on their mobile
            device. All data is stored locally on the user&apos;s device.
          </p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            3. Free Use &amp; No Warranty
          </h2>
          <p>
            StreakTracker is provided free of charge. The App is provided
            &quot;as is&quot; without warranty of any kind, express or implied,
            including but not limited to warranties of merchantability, fitness
            for a particular purpose, or non-infringement. Use of the App is at
            your own risk.
          </p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            4. User Responsibilities
          </h2>
          <p>You agree to:</p>
          <ul className="legalList">
            <li>Use the App only for lawful, personal purposes</li>
            <li>
              Not attempt to reverse-engineer, decompile, or modify the App
            </li>
            <li>
              Not use the App in any way that could harm, disable, or impair it
            </li>
          </ul>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            5. Data &amp; Privacy
          </h2>
          <p>
            All data entered into the App is stored locally on your device only.
            No personal data is transmitted to any server. Please refer to our{" "}
            <Link href="/privacy" className="legalLink">
              Privacy Policy
            </Link>{" "}
            for full details.
          </p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            6. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, Sebastian Falter
            shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, including but not limited to
            loss of data, arising from your use of or inability to use the App.
          </p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            7. Intellectual Property
          </h2>
          <p>
            All content, design, and code within StreakTracker is the
            intellectual property of Sebastian Falter unless otherwise stated.
            You may not copy, distribute, or create derivative works without
            explicit written permission.
          </p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            8. Changes to These Terms
          </h2>
          <p>
            These Terms of Service may be updated from time to time. Changes
            will be posted on this page with an updated date. Continued use of
            the App after changes constitutes acceptance of the revised terms.
          </p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            9. Governing Law
          </h2>
          <p>
            These Terms are governed by the laws of the Federal Republic of
            Germany. Any disputes arising from these terms shall be subject to
            the exclusive jurisdiction of German courts.
          </p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            10. Contact
          </h2>
          <p>
            For questions regarding these Terms, please contact:{" "}
            <a href="mailto:seb.falter@gmail.com" className="legalLink">
              seb.falter@gmail.com
            </a>
          </p>
        </motion.section>
      </div>
    </>
  );
}
