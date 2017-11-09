var flarum = require('flarum-gulp');

flarum({
  modules: {
    'michaelbelgium/flarum-discussion-views': 'src/**/*.js'
  }
});