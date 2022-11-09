import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
const CharacterBox = ({ data }) => {
  return (
    <motion.div
      className="w-full h-20 bg-slate-200/50 shadow-sm rounded-md relative"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        default: {
          duration: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        },
        scale: {
          type: "spring",
          damping: 10,
          stiffness: 50,
          restDelta: 0.001,
        },
      }}>
      <div className="w-1/4 h-full absolute top-0 left-0">
        <div className="w-full h-full relative top-0 left-0">
          <Image
            className="rounded-l-md"
            layout="fill"
            src={data.node.image.medium}
            alt={data.node.name.userPreferred}
          />
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-end pr-5">
        <div className="font-medium">{data.node.name.userPreferred}</div>
      </div>
    </motion.div>
  );
};

export default CharacterBox;
