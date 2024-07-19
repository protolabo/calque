import { useState } from 'react';
import { NodeHandler } from './Node';

interface NodeEditorProps {
  handler: NodeHandler;
}

const NodeEditor = (props: NodeEditorProps) => {
  const [name,  setName]  = useState(props.handler.node.name);
  const [size,  setSize]  = useState(props.handler.node.size);
  const [color, setColor] = useState(props.handler.node.color);
  const [x, setX] = useState(props.handler.node.x);
  const [y, setY] = useState(props.handler.node.y);

  const onNameChange = (name: string) => {
    setName(name);
    props.handler.setNode({
      ...props.handler.node,
      name,
    });
  };

  const onSizeChange = (size: string) => {
    const sizeNumber = parseInt(size);
    if (!isNaN(sizeNumber)) {
      setSize(sizeNumber);
      props.handler.setNode({
        ...props.handler.node,
        size: sizeNumber,
      });
    }
  };

  const onColorChange = (color: string) => {
    setColor(color);
    props.handler.setNode({
      ...props.handler.node,
      color,
    });
  };

  const onXChange = (x: string) => {
    const xNumber = parseInt(x);
    if (!isNaN(xNumber)) {
      setX(xNumber);
      props.handler.setNode({
        ...props.handler.node,
        x: xNumber,
      });
    }
  };

  const onYChange = (y: string) => {
    const yNumber = parseInt(y);
    if (!isNaN(yNumber)) {
      setY(yNumber);
      props.handler.setNode({
        ...props.handler.node,
        y: yNumber,
      });
    }
  };

  return (
    <div>
      <h2>Node editor</h2>
      <div>
        <label>Name</label>
        <input value={name} onChange={e => onNameChange(e.target.value)} />
      </div>
      <div>
        <label>Size</label>
        <input value={size} onChange={e => onSizeChange(e.target.value)} />
      </div>
      <div>
        <label>Color</label>
        <input value={color} onChange={e => onColorChange(e.target.value)} />
      </div>
      <div>
        <label>X</label>
        <input value={x} onChange={e => onXChange(e.target.value)} />
      </div>
      <div>
        <label>Y</label>
        <input value={y} onChange={e => onYChange(e.target.value)} />
      </div>
    </div>
  );
};

export default NodeEditor;
