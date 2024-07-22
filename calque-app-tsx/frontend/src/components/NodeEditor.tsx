import React, { useContext, ChangeEvent } from 'react';
import { GraphContext } from './Layout';
import { getNode, updateNode } from '../../models/State';

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: 'text' | 'number' | 'color';
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = 'text' }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (type === 'number') {
      onChange(parseInt(inputValue));
    } else {
      onChange(inputValue);
    }
  };

  return (
    <div className='p-2 flex gap-4'>
      <label>{label}</label>
      <input type={type} value={value} onChange={handleChange} />
    </div>
  );
};

interface NodeEditorProps {
  nodeId: number;
}

const NodeEditor: React.FC<NodeEditorProps> = ({ nodeId }) => {
  const graphHandler = useContext(GraphContext);
  const node = getNode(graphHandler.graph, nodeId);

  const updateField = (fieldName: keyof typeof node, value: string | number) => {
    updateNode(graphHandler, { ...node, [fieldName]: value });
  };

  return (
    <div className='mx-auto p-8 mt-2'>
      <h2 className='text-bold'>Properties of Node {node.name}</h2>
        <InputField label="Name" value={node.name} onChange={(value) => updateField('name', value)} />
        <InputField label="Size" value={node.size} onChange={(value) => updateField('size', value)} type="number" />
        <InputField label="Color" value={node.color} onChange={(value) => updateField('color', value)} type="color" />
        <InputField label="X" value={node.x} onChange={(value) => updateField('x', value)} type="number" />
        <InputField label="Y" value={node.y} onChange={(value) => updateField('y', value)} type="number" />
        <InputField label="Stroke" value={node.stroke} onChange={(value) => updateField('stroke', value)} type="color" />
        <InputField label="Stroke Width" value={node.strokeWidth} onChange={(value) => updateField('strokeWidth', value)} type="number" />
    </div>
  );
};

export default NodeEditor;
