import { useContext } from 'react';
import NodeEditor from './NodeEditor';
import { Entity, SelectedEntityContext } from './Layout';
import EdgeEditor from './EdgeEditor';

const Rightbar = () => {
  const { selectedEntity } = useContext(SelectedEntityContext);

  return (
    <div className="sticky flex-1 right-0 top-0 w-64 bg-secondary fixed  grid z-40 h-screen transition-transform -translate-x-full sm:translate-x-0">
      {selectedEntity !== null && (
        <EntityEditor entity={selectedEntity} />
      )}
    </div>
  );
};

interface EntityEditorProps {
  entity: Entity;
}

const EntityEditor = (props: EntityEditorProps) => {
  if (props.entity.kind === 'node') {
    return <NodeEditor nodeId={props.entity.nodeId} />
  }

  if (props.entity.kind === 'edge') {
    return <EdgeEditor edgeId={props.entity.edgeId} />
  }
}

export default Rightbar;
