import React from "react";
import invert from "invert-color";

const Tab = ({ CurrentTab, setCurrentTab, color }) => {
  return (
    <>
      <div className="w-[max-content] mx-auto mt-10">
        <div className="tabs tabs-boxed w-full bg-slate-300 ">
          <a
            className={`tab ${CurrentTab === "relations" ? "tab-active" : ""}`}
            onClick={() => setCurrentTab("relations")}
            style={{
              backgroundColor: CurrentTab === "relations" ? color : "",
              color:
                CurrentTab === "relations"
                  ? invert(color || "#2F0882", {
                      black: "#475569",
                      white: "#F1F5F9",
                    })
                  : "",
            }}>
            Relations
          </a>
          <a
            className={`tab ${CurrentTab === "character" ? "tab-active" : ""}`}
            onClick={() => setCurrentTab("character")}
            style={{
              backgroundColor: CurrentTab === "character" ? color : "",
              color:
                CurrentTab === "character"
                  ? invert(color || "#2F0882", {
                      black: "#475569",
                      white: "#F1F5F9",
                    })
                  : "",
            }}>
            Character
          </a>
          <a
            className={`tab ${CurrentTab === "media" ? "tab-active" : ""}`}
            onClick={() => setCurrentTab("media")}
            style={{
              backgroundColor: CurrentTab === "media" ? color : "",
              color:
                CurrentTab === "media"
                  ? invert(color || "#2F0882", {
                      black: "#475569",
                      white: "#F1F5F9",
                    })
                  : "",
            }}>
            Media
          </a>
        </div>
      </div>
    </>
  );
};

export default Tab;
