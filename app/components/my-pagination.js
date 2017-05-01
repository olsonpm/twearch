//---------//
// Imports //
//---------//

import Ember from 'ember';
import fp from 'npm:lodash/fp';
import _ from 'npm:lodash';


//------//
// Main //
//------//

export default Ember.Component.extend({
  classNames: ['pagination']
  , tagName: 'ul'

  , didRender() {
    const attachClickHandler = getAttachClickHandler(this)
      , $items = this.$('li')
      ;

    fp.each(
      fp.flow(
        setWidth
        , attachClickHandler
      )
      , $items
    );
  }
});


//-------------//
// Helper Fxns //
//-------------//

function setWidth(el) {
  return _.set(
    el
    , 'style.width'
    , Ember.$(el).outerHeight() + 'px'
  );
}

function getAttachClickHandler(componentInst) {
  return el => {
    if (Ember.$(el).is('.active,.ellipsis')) {
      return el;
    }

    const page = fp.trim(el.textContent);

    Ember.$(el).on('click', () => {
      console.log('happened');
      componentInst.bubble('toPage', { page });
    });

    return el;
  };
}
