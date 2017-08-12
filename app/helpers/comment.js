import Ember from "ember";

export default Ember.Helper.helper(function(params) {
  var result = params[0];
  var allReviews = params[1];
  var index = params[2] || 0;
  var resultReviews = result && result.reviews || [];
  var reviews = resultReviews.map(id => allReviews[id]);
  return reviews && reviews[index] ? reviews[index].comment : '';
});
