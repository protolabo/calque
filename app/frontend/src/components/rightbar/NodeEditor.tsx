import React, { useContext } from 'react';
import { GraphContext } from '../Layout';
import { getNode, updateNode } from '../../models/node';
import { InputField, Editor, EditorTitle } from './Rightbar'

export interface NodeEditorProps {
  nodeId: string;
}

const NodeEditor: React.FC<NodeEditorProps> = ({ nodeId }) => {
  // const [ nodeState, setNodeState ] = useState(currentNodeState)
  const graphHandler = useContext(GraphContext);
  const node = getNode(graphHandler.graph, nodeId);

    if (!node){
        return null; //TODO: handle this better when doing layers connections
    }

  const updateField = (fieldName: keyof typeof node, value: string | number) => {
    const updatedNode = { ...node, [fieldName]: value };
    updateNode(graphHandler, { ...node, [fieldName]: value });
    graphHandler.setLastEditedNode(updatedNode);
  };

  return (
    <Editor>
        <EditorTitle>Properties of Node {node.name}</EditorTitle>
        <InputField label="Name" value={node.name} onChange={(value) => updateField('name', value)} />
        <InputField label="Description" value={node.description} onChange={(value) => updateField('description', value)}/>
        <InputField label="Size" value={node.size} onChange={(value) => updateField('size', value)} type="number" />
        <InputField label="Color" value={node.color} onChange={(value) => updateField('color', value)} type="color" />
        <InputField label="X" value={node.x} onChange={(value) => updateField('x', value)} type="number" />
        <InputField label="Y" value={node.y} onChange={(value) => updateField('y', value)} type="number" />
        <InputField label="Stroke" value={node.stroke} onChange={(value) => updateField('stroke', value)} type="color" />
        <InputField label="Stroke Width" value={node.strokeWidth} onChange={(value) => updateField('strokeWidth', value)} type="number" />
    </Editor>
  );
};

export default NodeEditor;
