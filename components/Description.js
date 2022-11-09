import React, { useState } from "react";
import { motion } from "framer-motion";

const Description = ({ children }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <motion.div
        className={`w-full whitespace-wrap overflow-hidden  ${
          showMore ? "" : "text-ellipsis"
        }`}
        animate={{ height: showMore ? "100%" : "50px" }}>
        {children}
      </motion.div>
      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show Less" : "Show More"}
      </button>
    </>
  );
};

export default Description;
