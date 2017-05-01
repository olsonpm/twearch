import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['decorator']
  , classNameBindings: ['shouldDisplay::absent']
  , shouldDisplay: true
});
