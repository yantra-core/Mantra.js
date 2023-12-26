// Listens for events on parts
// TODO: this can be replaced with a Sutra
export default function partEventListeners(part, contraption) {
  let partType = part.type;
  let bindPartFnName = 'bind' + partType;
  if (typeof this[bindPartFnName] === 'function') {
    this[bindPartFnName](part, contraption);
  } else {
    console.log('missing', bindPartFnName)
    alert('missing bind' + bindPartFnName)
  }
}