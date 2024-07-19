import { NodeHandler } from './Node';

interface NodeEditorProps {
  handler: NodeHandler;
}

const NodeEditor = (props: NodeEditorProps) => {
  const onNameChange = (nameValue: string) => {
    const name = nameValue;
    props.handler.setNode({
      ...props.handler.node,
      name,
    });
  };

  const onSizeChange = (sizeValue: string) => {
    const size = parseInt(sizeValue);
    if (!isNaN(size)) {
      props.handler.setNode({
        ...props.handler.node,
        size,
      });
    }
  };

  const onColorChange = (colorValue: string) => {
    const color = colorValue;
    props.handler.setNode({
      ...props.handler.node,
      color,
    });
  };

  const onXChange = (xValue: string) => {
    const x = parseInt(xValue);
    if (!isNaN(x)) {
      props.handler.setNode({
        ...props.handler.node,
        x,
      });
    }
  };

  const onYChange = (yValue: string) => {
    const y = parseInt(yValue);
    if (!isNaN(y)) {
      props.handler.setNode({
        ...props.handler.node,
        y,
      });
    }
  };

  return (
    <div>
      <h2>Node editor</h2>
      <div>
        <label>Name</label>
        <input value={props.handler.node.name} onChange={e => onNameChange(e.target.value)} />
      </div>
      <div>
        <label>Size</label>
        <input value={props.handler.node.size} onChange={e => onSizeChange(e.target.value)} />
      </div>
      <div>
        <label>Color</label>
        <input value={props.handler.node.color} onChange={e => onColorChange(e.target.value)} />
      </div>
      <div>
        <label>X</label>
        <input value={props.handler.node.x} onChange={e => onXChange(e.target.value)} />
      </div>
      <div>
        <label>Y</label>
        <input value={props.handler.node.y} onChange={e => onYChange(e.target.value)} />
      </div>
    </div>
  );
};

export default NodeEditor;