var GitHubSearch = require('./../js/githire.js').gitHubModule;

$(document).ready(function() {

  var location;
  var language;
  var currentGitHubSearch;

  $("#github-search").submit(function(event) {

    event.preventDefault();

    // $("#error").hide();
    // $(".restart").empty();

    input_location = $("#location").val();
    input_language = $("#language").val();

    currentGitHubSearch = new GitHubSearch();

    currentGitHubSearch.userLookup(input_location, input_language);
    // currentGitHubSearch.reposLookup(input_username, displayRepos);

  });

});
