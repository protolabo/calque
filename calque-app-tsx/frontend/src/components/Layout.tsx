import React, { createContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { GraphState, NodeState, emptyGraph } from '../models/State';
import { loadState, saveState } from '../redux/localStorage';

type Page = 'menu' | 'creation' | 'enduser'
type Mode = 'view' | 'edit';
type Tool = 'select' | 'node' | 'edge' | 'pan';

const pageToPathMap: Record<Page, string> = {
  menu: '/',
  creation: '/create-map',
  enduser: '/map'
};

const pathToPageMap: Record<string, Page> = {
  '/': 'menu',
  '/create-map': 'creation',
  '/map': 'enduser',
};

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
  lastEditedNode: NodeState | null;
  setLastEditedNode: (node: NodeState | null) => void;
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
  const [graph, setGraph] = useState<GraphState>(loadState() || emptyGraph);
  const [lastEditedNode, setLastEditedNode] = useState<NodeState | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [page, setPage] = useState<Page>(() => {
    const path = window.location.pathname;
    return pathToPageMap[path] || 'menu';
  });

  const navigateTo = (page: Page) => {
    const path = pageToPathMap[page];
    window.history.pushState({}, '', path);
    handlePageChange(page); 
  };

  const handlePageChange = (page: Page) => {
    switch (page) {
      case 'creation':
        navigateTo('creation')
        break;
      case 'enduser':
        navigateTo('enduser')
        break;
      case 'menu':
      default:
        navigateTo('menu')
        break;
    }
  };

  useEffect(() => {
    saveState(graph);
  }, [graph]);

  useEffect(() => {
    console.log("Graph state initialized:", graph);
  }, [graph]);

  // Update URL
  useEffect(() => {
    const path = pageToPathMap[page];
    window.history.pushState({}, '', path);
  }, [page]);

  // Go back go forward <- ->
  useEffect(() => {
    const handlePopState = () => {
      console.log("page is being changed")
      const path = window.location.pathname;
      const newPage = pathToPageMap[path];
      
      if (newPage && newPage !== page) {
        setPage(newPage); 
        console.log("going to a new page")
      } 
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  

  return (
    <AppContext.Provider value={{ page, setPage, mode, setMode, tool, setTool }}>
      <GraphContext.Provider value={{ lastEditedNode, setLastEditedNode, graph, setGraph }}>
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
