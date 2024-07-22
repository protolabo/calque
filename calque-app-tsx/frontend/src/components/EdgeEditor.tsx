import { useContext } from 'react';
import { GraphContext } from './Layout';
import { getEdge, getNode, updateEdge, updateNode } from './State';

interface EdgeEditorProps {
  edgeId: number;
}

const EdgeEditor = (props: EdgeEditorProps) => {
  const graphHandler = useContext(GraphContext);
  const edge = getEdge(graphHandler.graph, props.edgeId);

  const onNameChange = (nameValue: string) => {
    const name = nameValue;
    updateEdge(graphHandler, { ...edge, name });
  };

  const onStrokeChange = (strokeValue: string) => {
    const stroke = strokeValue;
    updateEdge(graphHandler, { ...edge, stroke })
  }

  const onStrokeWidthChange = (strokeWidthValue: string) => {
    const strokeWidth = parseInt(strokeWidthValue);
    updateEdge(graphHandler, { ...edge, strokeWidth })
  }


  return (
  <div>
    <h2>Edge editor</h2>
      <div>
        <label>Name</label>
        <input value={edge.name} onChange={e => onNameChange(e.target.value)} />
      </div>
      <div>
        <label>Stroke</label>
        <input value={edge.stroke} onChange={e => onStrokeChange(e.target.value)} />
      </div>
      <div>
        <label>Stroke Width</label>
        <input value={edge.strokeWidth} onChange={e => onStrokeWidthChange(e.target.value)} />
      </div>

  </div>
)
};

export default EdgeEditor;
