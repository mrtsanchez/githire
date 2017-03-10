var GitHubSearch = require('./../js/githire.js').gitHubModule;
var FullContactSearch = require('./../js/fullcontact.js').fullContactModule;

function displayCandidateWithEmail(candidatesInformation) {

  if (candidatesInformation.hireable === true){
    $("#results").append('<div class="col-md-4">'+
                        '<div class="panel panel-primary">'+
                        '<div class="panel-heading">'+
                        '<div class="row"><div class="col-md-6">'+
                        '<h3 class="panel-title title">'+ candidatesInformation.name +'</h3></div>'+
                        '<div class="col-md-6 text-right">HIREABLE!</div></div>'+
                        '</div><div class="panel-body">'+
                        '<a href='+ candidatesInformation.url + ' target="_blank"><img src='+ candidatesInformation.avatar_url +  'alt="avatar" class="img-responsive profile-picture center-block"/></a>'+
                        '<p><strong>Username: </strong>' + candidatesInformation.login + '</p>'+
                        '<p><strong>Email: </strong>' + candidatesInformation.email + '</p>'+
                        '</div><div class="panel-footer"><div class="row"><div class="col-md-6"><a href="#" class="full-profile" data-toggle="modal" data-target="#myModal" data-github="'+ candidatesInformation.login + '" data-email="'+ candidatesInformation.email + '">Full Profile</a></div>'+
                        '<div class="col-md-6 text-right"><a href="mailto:' + candidatesInformation.email + '?subject=GitHire contact">Contact Developer</a></div>'+
                        '</div></div></div></div>');
  } else {
    $("#results").append('<div class="col-md-4">'+
                        '<div class="panel panel-default">'+
                        '<div class="panel-heading">'+
                        '<h3 class="panel-title title">'+ candidatesInformation.name +'</h3>'+
                        '</div><div class="panel-body">'+
                        '<a href='+ candidatesInformation.url + ' target="_blank"><img src='+ candidatesInformation.avatar_url +  'alt="avatar" class="img-responsive profile-picture center-block"/></a>'+
                        '<p><strong>Username: </strong>' + candidatesInformation.login + '</p>'+
                        '<p><strong>Email: </strong>' + candidatesInformation.email + '</p>'+
                        '</div><div class="panel-footer"><div class="row"><div class="col-md-6"><a href="#" class="full-profile" data-toggle="modal" data-target="#myModal" data-email="' + candidatesInformation.email + '">Full Profile</a></div>'+
                        '<div class="col-md-6 text-right"><a href="mailto:' + candidatesInformation.email + '?subject=GitHire contact">Contact Developer</a></div>'+
                        '</div></div></div></div>');
  }
}

function displayCandidateWithNoEmail(candidatesInformation){
  if (candidatesInformation.hireable === true){
    $("#results").append('<div class="col-md-4">'+
                        '<div class="panel panel-primary">'+
                        '<div class="panel-heading">'+
                        '<div class="row"><div class="col-md-6">'+
                        '<h3 class="panel-title title">'+ candidatesInformation.name +'</h3></div>'+
                        '<div class="col-md-6 text-right">HIREABLE!</div></div>'+
                        '</div><div class="panel-body">'+
                        '<a href='+ candidatesInformation.url + ' target="_blank"><img src='+ candidatesInformation.avatar_url +  'alt="avatar" class="img-responsive profile-picture center-block"/></a>'+
                        '<p><strong>Username: </strong>' + candidatesInformation.login + '</p>'+
                        '</div></div></div>');
  } else {
    $("#results").append('<div class="col-md-4">'+
                        '<div class="panel panel-default">'+
                        '<div class="panel-heading">'+
                        '<h3 class="panel-title title">'+ candidatesInformation.name +'</h3>'+
                        '</div><div class="panel-body">'+
                        '<a href='+ candidatesInformation.url + ' target="_blank"><img src='+ candidatesInformation.avatar_url +  'alt="avatar" class="img-responsive profile-picture center-block"/></a>'+
                        '<p><strong>Username: </strong>' + candidatesInformation.login + '</p>'+
                        '</div></div></div>');
  }
}

function displayResults(candidatesInformation){

  $("#spinner").hide();

  for (var i = 0; i < candidatesInformation.length; i++) {
    if (candidatesInformation[i].email !== null) {
      displayCandidateWithEmail(candidatesInformation[i]);
    } else {
      displayCandidateWithNoEmail(candidatesInformation[i]);
    }
  }
}

function displayProfile(profileData, githubProfile){

  $(".dev-profile").empty();
  $("#dev-name").append(profileData.contactInfo.fullName);
  $("#dev-location").append(profileData.demographics.locationGeneral);
  $("#dev-github-handle").append(githubProfile);
  for (var i = 0; i < profileData.socialProfiles.length; i++) {
    $("#dev-social").append('<li class="list-group-item"><a href="'+ profileData.socialProfiles[i].url +'" target="_blank">'+profileData.socialProfiles[i].typeName +'</a></li>');
    if (profileData.socialProfiles[i].type === "twitter"){
        var twitterHandle = responseJSON.socialProfiles[i].url;
        $("#dev-twitter").append('<a class="twitter-timeline" href="https://twitter.com/'+ twitterHandle +'">Tweets by '+ twitterHandle +'</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>');
    }
  }
  if (profileData.photos[0] != undefined){
    $("#dev-avatar").append('<img src="' + profileData.photos[0].url + '" alt="avatar" class="img-responsive"/>');
  }
}

$(document).ready(function() {

  var input_location;
  var input_language;
  var input_experience;
  var currentGitHubSearch;
  var currentFullContactSearch;

  $("#github-search").submit(function(event) {

    event.preventDefault();

    $("#spinner").show();
    $(".index-content").hide();
    $("#search-form").hide();

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

  });

  $("#results").on('click', '.full-profile', function(){

    var githubProfile = $(this).attr('data-github');
    var email = $(this).attr('data-email');
    console.log(githubProfile);

    currentFullContactSearch = new FullContactSearch();

    currentFullContactSearch.devsLookup(email, githubProfile, displayProfile);

  });



});
