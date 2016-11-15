var next = 11;

export default function() {
  this.timing = 1;
  this.logging = false;
  this.get('/api/results');
  this.get('/api/results/:id');
  this.post('/api/results/:id', (schema, request) => {
    var id = request.params.id;
    var result = schema.results.find(id);
    var json = JSON.parse(request.requestBody);
    var match = result.reviews.filter(function(review) {
      return review.reviewed ? review : undefined;
    });
    if (match.length > 0) {
      match[0]['rating'] = json.rating;
      return result.update(match);
    }
    next = next + 1;
    result.reviews.push({id: next, rating: json.rating, reviewed: true});
    return result.update();
  });
}
