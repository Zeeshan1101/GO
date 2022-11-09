import React from "react";
import { gql, useMutation } from "@apollo/client";
import invert from "invert-color";

export const ProcessINC = ({ id, color, progress, setProgress }) => {
  const [progressInc] = useMutation(ProgressMutation, {
    variables: {
      mediaId: id,
      progress: progress + 1,
    },
    onCompleted: (data) => {
      setProgress(data.progress.progress);
    },
  });
  const [progressDcr] = useMutation(ProgressMutation, {
    variables: {
      mediaId: id,
      progress: progress - 1,
    },
    onCompleted: (data) => {
      setProgress(data.progress.progress);
    },
  });
  const styles = {
    backgroundColor: color || "#2F0882",
    color: invert(color || "#2F0882", {
      black: "#475569",
      white: "#F1F5F9",
    }),
  };
  console.log(progress);
  return (
    <>
      <div
        className="px-4 h-4 max-h-1 min-h-[2rem] relative sm:flex hidden text-center items-center z-20 justify-center rounded-lg uppercase btn border-none no-animation"
        style={styles}
        onClick={progressInc}>
        +1
      </div>
      <div
        className="px-4 h-4 max-h-1 min-h-[2rem] relative sm:flex hidden text-center items-center z-20 justify-center rounded-lg uppercase btn border-none no-animation"
        style={styles}
        onClick={progressDcr}>
        -1
      </div>
    </>
  );
};
const ProgressMutation = gql`
  mutation SaveMediaListEntry($mediaId: Int, $progress: Int) {
    progress: SaveMediaListEntry(mediaId: $mediaId, progress: $progress) {
      id
      progress
    }
  }
`;
