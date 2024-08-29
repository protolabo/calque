import { GraphHandler } from "../components/Layout";
import { GraphState } from "./graph";

interface ImageState {
  id: number;
  name: string;
  x: number;
  y: number;
  opacity: number;
  width: number;
  ratio: number;
  stroke: string;
  href: string;
  description: string;
}

function getImage(graph: GraphState, imageId: number): ImageState {
  const image = graph.images.find(image => image.id === imageId);
  if (image === undefined) {
    throw `No image ${imageId} found in the graph.`;
  }

  return image;
}

function insertImage(handler: GraphHandler, href: string, width: number, height: number) {
  const ratio = height / width;
  const image = {
    id: handler.graph.autoIncrement,
    name: `image-${handler.graph.autoIncrement}`,
    x: 0,
    y: 0,
    width,
    ratio,
    opacity: 1,
    href
  } as ImageState;

  const graph = {
    ...handler.graph,
    autoIncrement: handler.graph.autoIncrement + 1,
    images: [...handler.graph.images, image],
  }

  handler.setGraph(graph);
  return image;
}

function updateImage(handler: GraphHandler, updatedImage: ImageState) {
  const graph = {
    ...handler.graph,
    images: handler.graph.images.map(image => image.id === updatedImage.id ? updatedImage : image),
  };

  handler.setGraph(graph);
}

function deleteImage(handler: GraphHandler, imageId: number) {
  const graph = {
    ...handler.graph,
    images: handler.graph.images.filter(image => image.id !== imageId),
  };

  handler.setGraph(graph);
}

export type { ImageState };
export { getImage, insertImage, updateImage, deleteImage };

