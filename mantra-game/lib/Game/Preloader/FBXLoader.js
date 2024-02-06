import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const fbxLoader = new FBXLoader();
export default const MantraFBXLoader = async (arg)=>{
  // so you can have attached animations and (potentially) textures
  const representation = typeof arg === 'string'? {model:arg} : arg;
  const fbxLoader = new FBXLoader();
  //TODO: handle animation and texture load
  const loadedModel = await new Promise((resolve, reject)=>{
      fbxLoader.load(
          representation.model,
          (object) => {
              resolve(object);
          },
          (xhr) => {
              //console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
          },
          (error) => {
              reject(error)
          }
      );
  });
  return loadedModel;
}