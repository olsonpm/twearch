//---------//
// Imports //
//---------//

import Ember from 'ember';


//------//
// Main //
//------//

export default Ember.Controller.extend({
  actions: {
    searchPerformed({ query }) {
      if (query) {
        this.transitionToRoute({ queryParams: { page: 1, query } });
      }
    }
    , toPage({ page }) {
      this.transitionToRoute({ queryParams: { page } });
    }
  }
  , isSearching: false
  , queryParams: ['page', 'query']
});
