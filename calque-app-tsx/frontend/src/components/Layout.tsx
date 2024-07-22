import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import Leftbar from './Leftbar';
import Rightbar from './Rightbar';
import React, { createContext, useState } from 'react';
import Canvas from './Canvas';
import { GraphState, emptyGraph } from '../../models/State';

type Mode = 'view' | 'edit';
type Tool = 'select' | 'node' | 'edge' | 'pan';

type Entity =
  | { kind: 'node', nodeId: number }
  | { kind: 'edge', edgeId: number }

interface AppHandler {
  mode: Mode;
  setMode: React.Dispatch<Mode>;
  tool: Tool;
  setTool: React.Dispatch<Tool>;
}

interface GraphHandler {
  graph: GraphState;
  setGraph: React.Dispatch<GraphState>;
}

interface SelectedEntityHandler {
  selectedEntity: Entity | null;
  setSelectedEntity: React.Dispatch<Entity | null>;
}

const AppContext = createContext<AppHandler>(undefined as any);
const GraphContext = createContext<GraphHandler>(undefined as any);
const SelectedEntityContext = createContext<SelectedEntityHandler>(undefined as any);

const Layout = () => {
  const [mode, setMode] = useState<Mode>('edit');
  const [tool, setTool] = useState<Tool>('select');
  const [graph, setGraph] = useState<GraphState>(emptyGraph);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  return (
    <AppContext.Provider value={{ mode, setMode, tool, setTool }}>
      <GraphContext.Provider value={{ graph, setGraph }}>
        <SelectedEntityContext.Provider value={{ selectedEntity, setSelectedEntity }}>
          <Navbar />
          <div className="flex flex-row">
            <Leftbar />
            <Canvas />
            <Rightbar />
          </div>
          <Outlet />
        </SelectedEntityContext.Provider>
      </GraphContext.Provider>
    </AppContext.Provider>
  );
};

export default Layout;
export type { Entity, GraphHandler, Mode, Tool };
export { AppContext, GraphContext, SelectedEntityContext };
