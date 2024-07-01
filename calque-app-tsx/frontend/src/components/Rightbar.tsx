import { GoTriangleDown } from "react-icons/go";
import { Component, ReactNode } from "react";
import { FiPlus } from "react-icons/fi";
import React from "react"
import NodeEditor from "./NodeEditor"

function Rightbar() {
  return (
    <div className=" bg-secondary fixed right-0 grid z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <NodeEditor/>
    </div>
  )
}


export default Rightbar;