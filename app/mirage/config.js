export default function() {
  this.timing = 1;
  this.logging = false;
  this.get('/api/results');
  this.get('/api/results/:id');
}
