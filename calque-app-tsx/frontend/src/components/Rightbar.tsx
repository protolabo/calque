import { GoTriangleDown } from "react-icons/go";
import { Component, ReactNode } from "react";
import { FiPlus } from "react-icons/fi";
import React from "react"
import NodeEditor from "./NodeEditor"

function Rightbar() {
  return (
    <div className="sticky flex-1 right-0 top-0 w-64 bg-secondary fixed  grid z-40  h-screen transition-transform -translate-x-full sm:translate-x-0">
      <NodeEditor/>
    </div>
  )
}


export default Rightbar;