import React, { createContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { GraphState, emptyGraph } from '../models/State';
import { loadState, saveState } from '../redux/localStorage';

type Page = 'menu' | 'creation' | 'enduser'
type Mode = 'view' | 'edit';
type Tool = 'select' | 'node' | 'edge' | 'pan';

type Entity =
  | { kind: 'node', id: number }
  | { kind: 'edge', id: number }
  | { kind: 'image', id: number }

interface AppHandler {
  page: Page
  setPage: React.Dispatch<React.SetStateAction<Page>>;
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
  const getPageFromUrl = (): Page => {
    const path = window.location.pathname;

    switch (path) {
      case '/create-map':
        return 'creation';
      case '/enduser':
        return 'enduser';
      default:
        return 'menu';
    }
  };

  const [mode, setMode] = useState<Mode>('edit');
  const [tool, setTool] = useState<Tool>('select');
  const [page, setPage] = useState<Page>(getPageFromUrl);
  const [graph, setGraph] = useState<GraphState>(loadState() || emptyGraph);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  useEffect(() => {
    saveState(graph);
  }, [graph]);

  return (
    <AppContext.Provider value={{ page, setPage, mode, setMode, tool, setTool }}>
      <GraphContext.Provider value={{ graph, setGraph }}>
        <SelectedEntityContext.Provider value={{ selectedEntity, setSelectedEntity }}>
          <Navbar />
          <Outlet />
        </SelectedEntityContext.Provider>
      </GraphContext.Provider>
    </AppContext.Provider>
  );
};

export default Layout;
export type { Entity, GraphHandler, Mode, Tool };
export { AppContext, GraphContext, SelectedEntityContext };
