import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  var reviewed = params[0] && params[0].length || 0;
  var length = parseInt(reviewed, 10);
  if (length === 0) {
    return 'not yet reviewed';
  }
  return length  > 1 ? `${reviewed} reviews` : `${reviewed} review`;
});
