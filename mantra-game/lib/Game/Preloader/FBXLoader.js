// Remark: Won't build with current tools
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export default async function loader (asset, root) {
  console.log("incoming asset", root, asset);
  // Ensure asset.url or a similar property holds the path to your FBX file
  const modelUrl = root + asset.url; // Assuming 'url' is the property holding the path to the FBX file

  console.log("modelUrl", modelUrl);
  const fbxLoader = new FBXLoader();
  // TODO: handle animation and texture load
  console.log("Loading model...", modelUrl);

  let loadedModel;
  
  try {
    loadedModel = await new Promise((resolve, reject) => {

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
  } catch (err) {
    console.log('Error loading model', err);
    throw err;
  }
  

  return loadedModel;
}
