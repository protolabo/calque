import React from 'react';
//All tool components:
import Pan from './components.tools/Pan.tool';
import CreateEdge from "./components.tools/CreateEdge.tool";
import CreateLine from "./components.tools/CreateLine.tool";
import Logo from "./components.tools/Logo.tool";
import CreateNode from "./components.tools/CreateNode.tool";



function ToolBar() {

  return (
    <div id="ToolBar" className="">
        <Logo/>
        <Pan/>
        <CreateEdge/>{/*
        <CreateLine/>*/}
        <CreateNode/>
    </div>
  )

}

export default ToolBar;
