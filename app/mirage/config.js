var next = 11;

export default function() {
  this.timing = 1;
  this.logging = false;
  this.get('/api/results');
  this.get('/api/results/:id');
  this.post('/api/login', (schema, request) => {
    var themeId, themeName, username;
    var json = JSON.parse(request.requestBody);
    username = json.username;
    if(username === 'green') {
      themeId = 3;
      themeName = 'theme-green';
    } else if(username === 'blue') {
      themeId = 2;
      themeName = 'theme-blue';
    } else {
      themeId = 1;
      themeName = 'theme-default';
    }
    return {username: username, themeId: themeId, themeName: themeName};
  });
  this.post('/api/results/:id', (schema, request) => {
    var id = request.params.id;
    var result = schema.results.find(id);
    var json = JSON.parse(request.requestBody);
    var match = result.reviews.filter(function(review) {
      return review.userId === 39 ? review : undefined;
    });
    if (match.length > 0) {
      match[0]['rating'] = json.rating;
      return result.update(match);
    }
    next = next + 1;
    result.reviews.push({id: next, rating: json.rating, userId: 39});
    return result.update();
  });
  this.put('/api/results/:id', (schema, request) => {
    var id = request.params.id;
    var result = schema.results.find(id);
    var json = JSON.parse(request.requestBody);
    var match = result.reviews.filter(function(review) {
        return review.userId === 39 ? review : undefined;
    });
    if (match.length > 0) {
        match[0]['comment'] = json.comment;
        return result.update(match);
    }
    return result.update();
  });
}
