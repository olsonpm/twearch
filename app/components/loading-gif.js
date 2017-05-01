//---------//
// Imports //
//---------//

import Ember from 'ember';
import decorate from 'twearch/library/decorate';


//------//
// Main //
//------//

export default Ember.Component.extend(decorate({
  alt: 'spinner'
  , attributeBindings: ['alt', 'src']
  , classNames: ['spinner']
  , src: '/img/spinner.gif'
  , tagName: 'img'
}));
