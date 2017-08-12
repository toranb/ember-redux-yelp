import Ember from "ember";

export default Ember.Helper.helper(function(params) {
  var result = params[0];
  var allReviews = params[1] || {};
  var resultReviews = result && result.reviews || [];
  var reviews = resultReviews.map(id => allReviews[id]);
  if (!reviews || reviews.length === 0) {
    return '';
  }
  var total = reviews.map((review) => {
    return review.rating;
  }).reduce((prev, next) => {
    return prev + next;
  });
  var fullStars = Math.floor(total / reviews.length);
  var halfStars = total / reviews.length;
  var stars = (new Array(fullStars + 1)).join('★');
  return fullStars === halfStars ? stars : stars.concat('½');
});
