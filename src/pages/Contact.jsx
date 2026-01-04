import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "../components/Magnetic";
import "./Contact.css";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("rajat.sharma.myid1@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-contact container">
      <div className="contact-wrapper">
        <motion.p
          className="contact-label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Get in touch
        </motion.p>

        <Magnetic>
          <motion.div
            className="email-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            onClick={handleCopyEmail}
            data-cursor="hover"
          >
            <h1 className="email-link">hello@rajat.com</h1>
            <AnimatePresence>
              {copied && (
                <motion.span
                  className="copy-toast"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Copied!
                </motion.span>
              )}
            </AnimatePresence>
            <span className="copy-hint">Click to copy</span>
          </motion.div>
        </Magnetic>

        <motion.div
          className="social-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[
            {
              name: "Instagram",
              url: "https://www.instagram.com/btw.rajat625/",
            },
            {
              name: "LinkedIn",
              url: "https://www.linkedin.com/in/rajat-sharma-9a053128b/",
            },
            { name: "GitHub", url: "https://github.com/RajatSharma404" },
          ].map((social, index) => (
            <Magnetic key={index}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                data-cursor="hover"
              >
                {social.name}
              </a>
            </Magnetic>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
