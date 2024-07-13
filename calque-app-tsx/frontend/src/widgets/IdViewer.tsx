import React, { useState, useEffect } from "react";
import System from "../services/System"; // Adjust path as needed
import Node from "../models/node"; // Adjust path as needed

const IdViewer: React.FC = () => {
  const [id, setId] = useState<string | null>(null); // State to hold the current ID

  useEffect(() => {
    const handleIdChange = (newId: string | null) => {
      if (newId) {
        setId(newId); // Update ID in state when focus changes to a node
      } else {
        setId(null); // Set ID to null when no node is focused
      }
    };

    System.on("focusChange", handleIdChange); // Listen for focusChange events

    return () => {
      System.off("focusChange", handleIdChange); // Clean up listener on component unmount
    };
  }, []); // Empty dependency array ensures useEffect runs only on mount and unmount

  return (
    <div id="IdViewer" className="">
      <h6 id="IdViewer_PrefixText" className="inline">
        Id:
      </h6>
      <div id="IdViewer_Variable" className="inline">
        {id ? id : "No selection"}
      </div>
    </div>
  );
};

export default IdViewer;
