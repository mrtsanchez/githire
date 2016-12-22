var GitHubSearch = require('./../js/githubapp.js').gitHubModule;

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

    currentGitHubSearch.userLookup(input_username, displayResults, displayErrorMessage);
    currentGitHubSearch.reposLookup(input_username, displayRepos);

  });

  $("#filter-by").submit(function(event){

    event.preventDefault();

    var language = $("#used-languages").val();

    currentGitHubSearch.reposbyLanguage(input_username, getReposByLanguage, language);
  });


});
