var apiKey = require ('./../.env').apiKey;

function GitHubSearch() {

};

GitHubSearch.prototype.locationLookup = function(location, language){
  $.get('https://api.github.com/search/users?q=location:' + location + '+followers:>100+language:'+ language + '?access_token=' + apiKey).then(function(response){
    console.log(response);
    }).fail(function(error){
    // displayErrorMessage(username);
    });
  };

  exports.gitHubModule = GitHubSearch;
