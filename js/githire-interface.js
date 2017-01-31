var GitHubSearch = require('./../js/githire.js').gitHubModule;

// function filterCandidates(){
//
//
// }

$(document).ready(function() {

  var input_location;
  var input_language;
  var input_experience;
  var currentGitHubSearch;

  $("#github-search").submit(function(event) {

    event.preventDefault();

    // $("#error").hide();
    // $(".restart").empty();

    input_location = $("#location").val();
    input_language = $("#language").val();
    input_experience = $("#experience").val();

    currentGitHubSearch = new GitHubSearch();

    currentGitHubSearch.devsLookup(input_location, input_language, input_experience);
    // currentGitHubSearch.reposLookup(input_username, displayRepos);

  });

});
