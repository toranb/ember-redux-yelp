import Ember from "ember";

export default Ember.Helper.helper(function(params) {
  var reviews = params[0];
  if (!reviews || reviews.length === 0) {
    return '';
  }
  var total = reviews.map((review) => {
    return review.rating;
  }).reduce((prev, next) => {
    return prev + next;
  });
  var fullStars = Math.floor(total / reviews.length);
  return (new Array(fullStars + 1)).join('★');
});
