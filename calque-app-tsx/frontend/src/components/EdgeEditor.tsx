import { useContext } from 'react';
import { GraphContext } from './Layout';
import { getEdge, updateEdge } from '../models/State';
import { InputField } from './InputField'

interface EdgeEditorProps {
  edgeId: number;
}

const EdgeEditor = (props: EdgeEditorProps) => {
  const graphHandler = useContext(GraphContext);
  const edge = getEdge(graphHandler.graph, props.edgeId);

  const updateField = (fieldName: keyof typeof edge, value: string | number) => {
    updateEdge(graphHandler, { ...edge, [fieldName]: value });
  };

  return (
    <div className='mx-auto p-8 mt-2'>
        <h2 className='text-bold'>Properties of {edge.name}</h2>
        <InputField label="Name" value={edge.name} onChange={(value) => updateField('name', value)} />
        <InputField label="Stroke" value={edge.stroke} onChange={(value) => updateField('stroke', value)} type="color" />
        <InputField label="Stroke Width" value={edge.strokeWidth} onChange={(value) => updateField('strokeWidth', value)} type="number" />
    </div>
)
};

export default EdgeEditor;
