//---------//
// Imports //
//---------//

import Ember from 'ember';


//------//
// Main //
//------//

export default Ember.Component.extend({
  classNames: ['input-search']

  , didRender() {
    const $button = this.$('button')
      , $input = this.$('input')
      , inputWidth = $input.outerWidth()
      , buttonWidth = $button.outerWidth()
      ;

    this.$('.shadow-container').width(
        Math.floor(inputWidth + buttonWidth)
      )
      .removeClass('absent')
      ;

    $button.on('click', () => {
      this.bubble('searchPerformed', {
        query: $input.val()
      });
    });
  }
});
