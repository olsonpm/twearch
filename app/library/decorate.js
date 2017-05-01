//
// README
// - currently just decorates with the following common functionality
//   : shouldDisplay
//

//---------//
// Imports //
//---------//

import _ from 'npm:lodash';
import fp from 'npm:lodash/fp';


//------//
// Init //
//------//

const absentWordRe = /\babsent\b/
  , bindingHasAbsent = bindingStr => absentWordRe.test(bindingStr)
  ;


//------//
// Main //
//------//

const decorate = aComponent => {
  // if the component already uses the absent class, then we shouldn't
  //   decorate it
  if (
    fp.includes('absent', aComponent.classNames)
    || fp.any(bindingHasAbsent, aComponent.classNameBindings)
  ) {
    return aComponent;
  }

  const classNameBindings = aComponent.classNameBindings || [];

  classNameBindings.push('shouldDisplay::absent');

  return _.merge(aComponent, { classNameBindings });
}


//---------//
// Exports //
//---------//

export default decorate;
