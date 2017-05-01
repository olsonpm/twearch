//---------//
// Imports //
//---------//

import Ember from 'ember';
import decorate from 'twearch/library/decorate';


//------//
// Main //
//------//

export default Ember.Component.extend(decorate({
  attributeBindings: ['xmlns', 'viewBox']
  , classNames: ['icon', 'search']
  , tagName: 'svg'
  , viewBox: '0 0 56.966 56.966'
  , xmlns: 'http://www.w3.org/2000/svg'
}));
