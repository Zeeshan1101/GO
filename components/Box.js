import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
export default function Box(props) {
  return (
    <Link href={`/${props.data.type.toLowerCase()}/${props.data.id}`}>
      <a>
        <motion.div
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
          }}
          className="w-full lg:h-[20rem] md:h-64 sm:h-64 h-64 group relative shadow-2xl rounded-md">
          <div className="w-3/5 h-1/5 absolute hidden group-hover:block blur-2xl bottom-[-10px] left-1/2 -translate-x-1/2 transition-all duration-1000">
            <div
              className="w-full h-full relative"
              style={{ backgroundColor: props.data.coverImage.color }}></div>
          </div>
          <div className="absolute w-full h-full sm:hidden block group-hover:bg-slate-300/25 z-[100]"></div>
          <Image
            className="rounded-sm group-hover:scale-x-110 group-hover:scale-y-110  group-hover:z-10 transition-all hover:shadow-lg "
            layout="fill"
            src={props.data.coverImage.extraLarge}
            alt=""
          />
          <div className="w-full whitespace-nowrap overflow-hidden text-ellipsis text-center absolute hidden md:group-hover:block -bottom-0 group-hover:-bottom-8   left-1/2 -translate-x-1/2 z-20 text-slate-900 font-semibold md:scale-90 text-base  transition-all duration-1000">
            {props.data.title.english || props.data.title.userPreferred}
          </div>
        </motion.div>
      </a>
    </Link>
  );
}
