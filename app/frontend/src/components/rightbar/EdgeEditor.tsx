import { useContext } from 'react';
import { GraphContext } from '../Layout';
import { getEdge, updateEdge } from '../../models/edge';
import { InputField, Editor, EditorTitle } from './Rightbar'

export interface EdgeEditorProps {
  edgeId: number;
}

const EdgeEditor = (props: EdgeEditorProps) => {
  const graphHandler = useContext(GraphContext);
  const edge = getEdge(graphHandler.graph, props.edgeId);

  const updateField = (fieldName: keyof typeof edge, value: string | number) => {
    const updatedEdge = { ...edge, [fieldName]: value };
    updateEdge(graphHandler, { ...edge, [fieldName]: value });
    graphHandler.setLastEditedEdge(updatedEdge);
  };

  return (
    <Editor>
        <EditorTitle>Properties of Edge {edge.name}</EditorTitle>
        <InputField label="Name" value={edge.name} onChange={(value) => updateField('name', value)} />
        <InputField label="Stroke" value={edge.stroke} onChange={(value) => updateField('stroke', value)} type="color" />
        <InputField label="Stroke Width" value={edge.strokeWidth} onChange={(value) => updateField('strokeWidth', value)} type="number" />
        <InputField label="Description" value={edge.description} onChange={(value) => updateField('description', value)} />
    </Editor>
)
};

export default EdgeEditor;
