//---------//
// Imports //
//---------//

import fp from 'npm:lodash/fp';


//------//
// Main //
//------//

//
// Flattens the properties of an object recursively.  Nested properties override
//   shallower properties in a name conflict.  Order is not guaranteed for
//   same-level property name conflicts
//
// Example:
// const streams = {
//   created_at: "2017-04-30T17:57:47Z",
//   viewers: 153,
//   channel: {
//     created_at: "2013-11-26T02:59:20.288744Z",
//     display_name: "Drozdowsky"
//   }
// }
//
// flattenObj(people); // returns
//
// {
//   viewers: 153,
//   created_at: "2013-11-26T02:59:20.288744Z",
//   display_name: "Drozdowsky",
// }
//
// ** notice how the nested property 'created_at' overwrote the top
//    level property
//

const flattenObj = obj => {
  const top = fp.omitBy(fp.isPlainObject, obj);

  let nestedObjectsArr = fp.flow(fp.pickBy(fp.isPlainObject), fp.values)(obj);

  const doubleNested = fp.filter(hasPlainObjectValue, nestedObjectsArr);
  if (doubleNested.length) {
    const flattened = fp.map(flattenObj, doubleNested);
    nestedObjectsArr = fp.flow(
      fp.reject(hasPlainObjectValue)
      , fp.concat(fp.__, flattened)
    )(nestedObjectsArr);
  }

  return fp.mergeAll([top, ...nestedObjectsArr]);
};

const uMapKeys = fp.mapKeys.convert({ cap: false });


//-------------//
// Helper Fxns //
//-------------//

function hasPlainObjectValue(obj) {
  return fp.any(fp.isPlainObj, obj);
}


//---------//
// Exports //
//---------//

export { flattenObj, uMapKeys };
