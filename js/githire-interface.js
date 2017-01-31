var GitHubSearch = require('./../js/githire.js').gitHubModule;

// function filterCandidates(){
//
//
// }

$(document).ready(function() {

  var input_location;
  var input_language;
  var currentGitHubSearch;

  $("#github-search").submit(function(event) {

    event.preventDefault();

    // $("#error").hide();
    // $(".restart").empty();

    input_location = $("#location").val();
    input_language = $("#language").val();
    console.log(input_location);
    console.log(input_language);

    currentGitHubSearch = new GitHubSearch();

    currentGitHubSearch.devsLookup(input_location, input_language);
    // currentGitHubSearch.reposLookup(input_username, displayRepos);

  });

});
