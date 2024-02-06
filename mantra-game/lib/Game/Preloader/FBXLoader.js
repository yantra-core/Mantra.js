import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export default async function (asset) {
  console.log("incoming asset", asset);
  // Ensure asset.url or a similar property holds the path to your FBX file
  const modelUrl = asset.url; // Assuming 'url' is the property holding the path to the FBX file

  const fbxLoader = new FBXLoader();
  // TODO: handle animation and texture load
  console.log("Loading model...");

  const loadedModel = await new Promise((resolve, reject) => {

    console.log('loading resource', modelUrl)
    fbxLoader.load(
      modelUrl, // Use the URL or path from the asset object
      (object) => { // OnLoad callback
        resolve(object);
      },
      (xhr) => { // OnProgress callback
        console.log(`Model load progress: ${(xhr.loaded / xhr.total) * 100}%`);
      },
      (error) => { // OnError callback
        console.error('An error happened during the loading of the model');
        reject(error);
      }
    );
  });

  return loadedModel;
}
