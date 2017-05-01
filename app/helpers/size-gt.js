import Ember from 'ember';
import fp from 'npm:lodash/fp';

export function sizeGt([aNumber, collection]) {
  return fp.size(collection) > aNumber;
}

export default Ember.Helper.helper(sizeGt);
