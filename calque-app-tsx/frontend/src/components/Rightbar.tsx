import { useContext } from 'react';
import NodeEditor from './NodeEditor';
import { SelectedNodeContext } from './Layout';

const Rightbar = () => {
  const { selectedNodeHandler } = useContext(SelectedNodeContext);

  return (
    <div className="sticky flex-1 right-0 top-0 w-64 bg-secondary fixed  grid z-40 h-screen transition-transform -translate-x-full sm:translate-x-0">
      {selectedNodeHandler !== null && (
        <NodeEditor
          key={selectedNodeHandler.node.id}
          handler={selectedNodeHandler}
        />
      )}
    </div>
  );
};

export default Rightbar;
