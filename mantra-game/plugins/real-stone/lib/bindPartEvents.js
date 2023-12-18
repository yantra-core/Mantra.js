// Listens for events on parts
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