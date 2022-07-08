import { useQuery, gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../pages/apollo-client";
import invert from "invert-color";
import { motion, AnimatePresence } from "framer-motion";
const UserStatus = ({ color, id, media }) => {
  const { user } = useAuth();
  const ref = useRef();
  const [status, setStatus] = useState();
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  });
  const { data, loading } = useQuery(UserQuery, {
    variables: {
      userId: user.id,
      id: id,
    },
    onCompleted: (data) => {
      setStatus(data.status.status);
    },
  });

  const [statusCompleted, { data: data1 }] = useMutation(StatusMutation, {
    variables: {
      mediaId: id,
      status: "COMPLETED",
    },
    onCompleted: (data) => {
      setStatus(data.status.status);
      setShow(!show);
      setLoad(false);
    },
  });

  const [statusPlan] = useMutation(StatusMutation, {
    variables: {
      mediaId: id,
      status: "PLANNING",
    },
    onCompleted: (data) => {
      setStatus(data.status.status);
      setShow(!show);
      setLoad(false);
    },
  });

  const [statusWatching] = useMutation(StatusMutation, {
    variables: {
      mediaId: id,
      status: "CURRENT",
    },
    onCompleted: (data) => {
      setStatus(data.status.status);
      setShow(!show);
      setLoad(false);
    },
  });

  const [statusDrop] = useMutation(StatusMutation, {
    variables: {
      mediaId: id,
      status: "DROPPED",
    },
    onCompleted: (data) => {
      setStatus(data.status.status);
      setShow(!show);
      setLoad(false);
    },
  });
  if (loading) {
    return <div></div>;
  }
  console.log(data);
  const styles = {
    backgroundColor: color || "#2F0882",
    color: invert(color || "#2F0882", {
      black: "#475569",
      white: "#F1F5F9",
    }),
  };

  return (
    <>
      <div ref={ref} className="w-full z-[100] flex items-center">
        <div className="w-44 relative">
          <AnimatePresence>
            {show && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, animationDelay: "0.3s" }}
                exit={{ opacity: 0 }}
                className="btn-group-vertical absolute -translate-y-full w-full text-center  pb-1 item-group ">
                <button
                  className={`btn w-full -z-10 no-animation border-none xyz`}
                  onClick={() => {
                    statusCompleted();
                    setLoad(true);
                  }}
                  style={styles}>
                  Completed
                </button>
                <button
                  className={`btn w-full -z-10 no-animation border-none `}
                  onClick={statusWatching}
                  style={styles}>
                  {media === "anime" ? "Watching" : "Reading"}
                </button>
                <button
                  className={`btn w-full -z-10 no-animation border-none `}
                  onClick={statusPlan}
                  style={styles}>
                  PLan to {media === "anime" ? "Watch" : "Read"}
                </button>
                <button
                  className={`btn w-full -z-10 no-animation border-none `}
                  onClick={statusDrop}
                  style={styles}>
                  Drop
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            className={`w-44 px-3 h-4 max-h-1 min-h-[2rem] relative md:mx-0 mx-auto text-center flex items-center z-20 justify-center rounded-lg uppercase btn border-none no-animation ${
              load ? "loading" : ""
            }`}
            onClick={() => setShow(!show)}
            style={styles}>
            {status ? displayStatus(status, media) : "Add To List"}
            {"  "}
            {status === "CURRENT" ? data.status.progress : ""}
            <span
              className={`material-symbols-rounded -rotate-90 transition-all absolute right-2 ${
                show ? "-rotate-180" : ""
              }`}
              style={styles}>
              expand_more
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
const displayStatus = (status, media) => {
  switch (status) {
    case "CURRENT":
      return media === "anime" ? "Watching" : "Reading";
    case "PLANNING":
      return `Plan To ${media === "anime" ? "Watch" : "Read"}`;
    case "COMPLETED":
      return "completed";
    case "DROPPED":
      return "Dropped";
    case "REPEATING":
      return "Rewatching";
    default:
      return "NO status";
  }
};

const UserQuery = gql`
  query ($id: Int, $userId: Int) {
    status: MediaList(mediaId: $id, userId: $userId) {
      id
      status
      progress
    }
  }
`;
const StatusMutation = gql`
  mutation SaveMediaListEntry($mediaId: Int, $status: MediaListStatus) {
    status: SaveMediaListEntry(mediaId: $mediaId, status: $status) {
      id
      status
      progress
    }
  }
`;
export default UserStatus;
