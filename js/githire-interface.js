var GitHubSearch = require('./../js/githire.js').gitHubModule;

function displayResults(candidatesInformation){

  $("#spinner").hide();

  for (var i = 0; i < candidatesInformation.length; i++) {
    $("#results").append('<div class="col-md-4">'+
                        '<div class="panel panel-default">'+
                        '<div class="panel-heading">'+
                        '<h3 class="panel-title title">'+ candidatesInformation[i].name +'"</h3>"'



                      );
  }
}


$(document).ready(function() {

  var input_location;
  var input_language;
  var input_experience;
  var currentGitHubSearch;

  $("#github-search").submit(function(event) {

    event.preventDefault();

    $("#spinner").show()
    $(".index-content").hide();

    // $("#error").hide();
    // $(".restart").empty();

    input_location = $("#location").val();
    input_language = $("#language").val();
    input_experience = $("#experience").val();

    console.log(input_location);
    console.log(input_language);
    console.log(input_experience);


    currentGitHubSearch = new GitHubSearch();

    currentGitHubSearch.devsLookup(input_location, input_language, input_experience, displayResults);
    // currentGitHubSearch.reposLookup(input_username, displayRepos);

  });

});
