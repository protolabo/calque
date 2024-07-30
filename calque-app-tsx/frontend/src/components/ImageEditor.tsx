import React, { useContext, useState } from 'react';
import { GraphContext } from './Layout';
import { getImage, updateImage } from '../models/State';
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
        <InputField label="Opacity" value={image.opacity} onChange={(value) => updateField('opacity', value)} type="number" />
        <InputField label="Description" value={image.description} onChange={(value) => updateField('description', value)}/>
    </Editor>
  );
};

export default ImageEditor;
