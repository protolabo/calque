import { useContext } from 'react';
import { GraphContext } from './Layout';
import { getNode, updateNode } from './State';

interface NodeEditorProps {
  nodeId: number;
}

const NodeEditor = (props: NodeEditorProps) => {
  const graphHandler = useContext(GraphContext);
  const node = getNode(graphHandler.graph, props.nodeId);

  const onNameChange = (nameValue: string) => {
    const name = nameValue;
    updateNode(graphHandler, { ...node, name });
  };

  const onSizeChange = (sizeValue: string) => {
    const size = parseInt(sizeValue);
    if (!isNaN(size)) {
      updateNode(graphHandler, { ...node, size });
    }
  };

  const onColorChange = (colorValue: string) => {
    const color = colorValue;
    updateNode(graphHandler, { ...node, color });
  };

  const onXChange = (xValue: string) => {
    const x = parseInt(xValue);
    if (!isNaN(x)) {
      updateNode(graphHandler, {...node, x });
    }
  };

  const onYChange = (yValue: string) => {
    const y = parseInt(yValue);
    if (!isNaN(y)) {
      updateNode(graphHandler, { ...node, y });
    }
  };

  const onStrokeChange = (strokeValue: string) => {
    const stroke = strokeValue;
    updateNode(graphHandler, { ...node, stroke })
  }

  const onStrokeWidthChange = (strokeWidthValue: string) => {
    const strokeWidth = parseInt(strokeWidthValue);
    updateNode(graphHandler, { ...node, strokeWidth })
  }

  return (
    <div className='mx-auto mt-4'>
      <h2>Node editor</h2>
      <div>
        <label>Name</label>
        <input value={node.name} onChange={e => onNameChange(e.target.value)} />
      </div>
      <div>
        <label>Size</label>
        <input value={node.size} onChange={e => onSizeChange(e.target.value)} />
      </div>
      <div>
        <label>Color</label>
        <input value={node.color} onChange={e => onColorChange(e.target.value)} />
      </div>
      <div>
        <label>X</label>
        <input value={node.x} onChange={e => onXChange(e.target.value)} />
      </div>
      <div>
        <label>Y</label>
        <input value={node.y} onChange={e => onYChange(e.target.value)} />
      </div>
      <div>
        <label>Stroke</label>
        <input value={node.stroke} onChange={e => onStrokeChange(e.target.value)} />
      </div>
      <div>
        <label>Stroke Width</label>
        <input value={node.strokeWidth} onChange={e => onStrokeWidthChange(e.target.value)} />
      </div>
    </div>
  );
};

export default NodeEditor;