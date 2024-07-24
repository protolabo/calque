import React, { ChangeEvent, ReactNode, useContext } from 'react';
import NodeEditor from './NodeEditor';
import { AppContext, Entity, GraphContext, SelectedEntityContext } from './Layout';
import EdgeEditor, { EdgeEditorProps } from './EdgeEditor';
import { getEdge, getNode, NodeState } from '../models/State';
import { NodeEditorProps } from './NodeEditor';

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

const Rightbar = () => {
  const { selectedEntity } = useContext(SelectedEntityContext);
  const { mode } = useContext(AppContext)

  return (
    <div className="sticky flex-1 top-0 bg-secondary fixed z-40 h-screen transition-transform -translate-x-full sm:translate-x-0">
      {mode === 'edit' && (selectedEntity !== null && (
        <EntityEditor entity={selectedEntity} />
      ))}
    </div>
  );
};

interface EntityEditorProps {
  entity: Entity;
}

const Editor = (props: {children: ReactNode}) => {
  const divclasses = 'mx-auto p-4'
  return(
    <div className={divclasses}>
      {props.children}
    </div>    
  ) 
}

const EditorTitle = (props: {children: ReactNode}) => {
  const editorTitle = 'font-bold'
  return <h2 className={editorTitle}></h2>

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
export type { InputFieldProps }
export { InputField, Editor, EditorTitle }
