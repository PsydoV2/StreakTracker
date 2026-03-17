import Head from "next/head";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/Breadcrumb";

export default function Imprint() {
  return (
    <>
      <Head>
        <title>StreakTracker – Imprint</title>
        <meta name="description" content="Legal imprint for StreakTracker" />
      </Head>

      <div className="legalPage">
        <Breadcrumb current="Imprint" />
        <motion.h1
          className="patrick-hand-regular legalTitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Imprint
        </motion.h1>

        <motion.p
          className="legalMeta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Information according to § 5 TMG
        </motion.p>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">Responsible Person</h2>
          <p>Sebastian Falter</p>
          <p>[Street, House Number]</p>
          <p>[Postal Code, City]</p>
          <p>Germany</p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">Contact</h2>
          <p>
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
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            Responsible for content according to § 18 Abs. 2 MStV
          </h2>
          <p>Sebastian Falter</p>
          <p>[Street, House Number]</p>
          <p>[Postal Code, City]</p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">Disclaimer</h2>
          <p>
            The contents of this website have been created with the greatest
            possible care. However, no guarantee can be given for the accuracy,
            completeness, and topicality of the content. As a service provider,
            I am responsible for my own content on these pages under general law
            in accordance with § 7 Abs. 1 TMG. According to §§ 8 to 10 TMG,
            however, I am not obligated to monitor transmitted or stored
            third-party information or to investigate circumstances that indicate
            illegal activity.
          </p>
        </motion.section>

        <motion.section
          className="legalSection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="legalSectionTitle patrick-hand-regular">
            Dispute Resolution
          </h2>
          <p>
            The European Commission provides a platform for online dispute
            resolution (ODR):{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="legalLink"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            . I am not obliged nor willing to participate in dispute resolution
            proceedings before a consumer arbitration board.
          </p>
        </motion.section>
      </div>
    </>
  );
}
