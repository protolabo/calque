import React, { ChangeEvent, ReactNode, useContext } from 'react';
import NodeEditor from './NodeEditor';
import { AppContext, Entity, SelectedEntityContext } from '../Layout';
import EdgeEditor from './EdgeEditor';
import ImageEditor from './ImageEditor';

interface InputFieldProps {
    label: string;
    value: string | number;
    onChange: (value: string | number) => void;
    type?: 'text' | 'number' | 'color';
}

interface TutoProps {
  children: ReactNode
  strong? : string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = 'text' }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const inputValue = e.target.value;
    // onChange(inputValue);
    if (type === 'number' && label === 'Opacity') {
      onChange(parseFloat(inputValue)); 
    } else if(type === 'number'){
      onChange(parseInt(inputValue));
    } else {
      onChange(inputValue);
    }
  };

  return (
    <div className='p-2 grid gap-4'>
      <label className='font-bold'>{label}</label>
      <input type={type} value={value} onChange={handleChange} />
    </div>
  );
};

const RBTutorial = ( props: TutoProps ) => {
  return(
    <div className='m-4'>
      {props.strong && <strong>{props.strong}</strong>}
      {props.children}
    </div>
  )
}

const RBTutorials : React.FC = () => {
  return(
    <>
      {/*
          <RBTutorial> Clique sur l'icone Rond pour ajouter des noeuds. </RBTutorial>
          <RBTutorial> Clique sur un noeud pour modifier ses propriétés.</RBTutorial>
          <RBTutorial> Clique sur la barre diagonale pour relier les noeuds en cliquant sur les noeuds à relier.</RBTutorial>
       */}
      <RBTutorial>Click on the circle icon to add nodes.</RBTutorial>
      <RBTutorial>Click on a node to edit its properties.</RBTutorial>
      <RBTutorial>Click on the diagonal line to link the nodes by clicking on the nodes that you want to link.</RBTutorial>
      <RBTutorial>Ctrl + V (or Cmd + V on Mac) to add images.</RBTutorial>
      <RBTutorial strong="Chromium users: "> (Google Chrome, Edge...) Add a node before pasting an image.</RBTutorial>
      <RBTutorial strong="Export: ">Keep the .calque in the name so you can import that map on the website.</RBTutorial>
    </>
  )
}

const Rightbar = () => {
  const { selectedEntity } = useContext(SelectedEntityContext);
  const { mode } = useContext(AppContext)

  return (
    <>
    {mode === 'edit' && 
      <div className="sticky basis-1/6 w-64 top-0 bg-secondary z-40 h-screen sm:translate-x-0 overflow-y-scroll">
        {selectedEntity !== null && (
          <EntityEditor entity={selectedEntity} />
        )}
        {selectedEntity === null && (  
          <RBTutorials/>
        )}
      </div>}
    </>
    
  );
};

interface EntityEditorProps {
  entity: Entity;
}

const Editor = (props: {children: ReactNode}) => {
  const divclasses = 'mx-auto p-4 overflow-y-auto'
  return(
    <div className={divclasses}>
      {props.children}
    </div>    
  ) 
}

const EditorTitle = (props: {children: ReactNode}) => {
  const editorTitle = 'font-bold text-lg'
  return <h2 className={editorTitle}>{props.children}</h2>

}

const EntityEditor = (props: EntityEditorProps) => {
  if (props.entity.kind === 'node') {
    return <NodeEditor nodeId={props.entity.id} />
  }

  if (props.entity.kind === 'edge') {
    return <EdgeEditor edgeId={props.entity.id} />
  }

  if (props.entity.kind === 'image') {
    return <ImageEditor imageId={props.entity.id} />
  }
}

export default Rightbar;
export type { InputFieldProps }
export { InputField, Editor, EditorTitle }
