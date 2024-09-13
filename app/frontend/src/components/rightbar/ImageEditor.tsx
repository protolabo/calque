import React, { useContext } from 'react';
import { GraphContext } from '../Layout';
import { getImage, updateImage } from '../../models/image';
import { InputField, Editor, EditorTitle } from './Rightbar'

export interface ImageEditorProps {
  imageId: number;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ imageId }) => {
  const graphHandler = useContext(GraphContext);
  const image = getImage(graphHandler.graph, imageId);

  const updateField = (fieldName: keyof typeof image, value: string | number) => {
    updateImage(graphHandler, { ...image, [fieldName]: value });
  };

  return (
    <Editor>
        <EditorTitle>Properties of Image {image.name}</EditorTitle>
        <InputField label="Name" value={image.name} onChange={(value) => updateField('name', value)} />
        <InputField label="X" value={image.x} onChange={(value) => updateField('x', value)} type="number" />
        <InputField label="Y" value={image.y} onChange={(value) => updateField('y', value)} type="number" />
        <InputField label="Size" value={image.width} type="number" onChange={(value) => {
          //const newHeight: number = (value as number) * image.ratio;
          updateField('width', value);
          //updateField('height', value);
        }} />
        <InputField label="Opacity" value={image.opacity} onChange={(value) => updateField('opacity', value)} type="number" />
        <InputField label="Description" value={image.description} onChange={(value) => updateField('description', value)}/>
    </Editor>
  );
};

export default ImageEditor;
