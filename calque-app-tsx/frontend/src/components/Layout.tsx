import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import Leftbar from "./Leftbar"
import Rightbar from "./Rightbar"
import React, { createContext, useState } from 'react';
import Canvas from "./Canvas"
import { NodeHandler } from "./Node";

type Mode = 'view' | 'edit';
type Tool = 'select' | 'node' | 'edge' | 'pan';

interface AppHandler {
  mode: Mode;
  setMode: React.Dispatch<Mode>;
  tool: Tool;
  setTool: React.Dispatch<Tool>;
}

interface SelectedNodeHandler {
  selectedNodeHandler: NodeHandler | null,
  setSelectedNodeHandler: React.Dispatch<NodeHandler>,
}

const AppContext = createContext<AppHandler>(undefined as any);
const SelectedNodeContext = createContext<SelectedNodeHandler>(undefined as any);

const Layout = () => {
  const [mode, setMode] = useState<Mode>('edit');
  const [tool, setTool] = useState<Tool>('select');
  const [selectedNodeHandler, setSelectedNodeHandler] = useState<NodeHandler | null>(null);

  return (
    <AppContext.Provider value={{ mode, setMode, tool, setTool }}>
      <SelectedNodeContext.Provider value={{ selectedNodeHandler, setSelectedNodeHandler }}>
        <Navbar />
        <div className="flex flex-row">
          <Leftbar />
          <Canvas />
          <Rightbar />
        </div>
        <Outlet />
      </SelectedNodeContext.Provider>
    </AppContext.Provider>
  )
};

export default Layout;
export type { Mode, Tool };
export { AppContext, SelectedNodeContext };
