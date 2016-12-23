var apiKey = require ('./../.env').apiKey;

function GitHubSearch() {

};

GitHubSearch.prototype.locationLookup = function(location, language){
  var usernames = [];
  var candidatesInformation = [];
  $.get('https://api.github.com/search/users?q=location:' + location + '+followers:%3E50+language:'+ language + '?access_token=' + apiKey +'&per_page=100').then(function(response){
    // Add the first 100 developers to an array
    var users = response.items;
    for(var i = 0; i < users.length; i++){
      usernames.push(users[i].login);
    }
    // Github responses are paginated. If there are mote than 100 results, get the additional pages.
    if (response.total_count > 100) {
      var pages = Math.ceil(response.total_count/100);
      for (var j= 2; j <= pages; j++) {
        $.get('https://api.github.com/search/users?q=location:' + location + '+followers:%3E50+language:'+ language + '?access_token=' + apiKey +'&page='+ j +'&per_page=100').then(function(response){
          var users = response.items;
          for(var k = 0; k < users.length; k++){
            usernames.push(users[k].login);
          }
        }).fail(function(error){
        // displayErrorMessage(username);
        });
      }
    }
    console.log(usernames);

    // get all the repos of the developers
    var repos = [];
    for(var l = 0; l < response.total_count; l++){
      repos.push($.get('https://api.github.com/users/' + usernames[l] + '/repos?access_token='+ apiKey));
    }
    console.log(repos);

    // extract the actual repos from the array of objects created in the last step
    $.when.apply($, repos).done(function(){
      var allrepos = [];
      for(var m = 0, len = arguments.length; m < len; m++){
        allrepos.push(arguments[m][0]);
      }
      console.log(allrepos);

      var candidates = [];

      // Filter the candidates by their repos
      for(var n = 0; n < allrepos.length; n++){
        var topRepos = [];
        for (var o = 0; o < allrepos[n].length; o++){
          if (allrepos[n][o].language === language && allrepos[n][o].forks_count >= 2 && allrepos[n][o].watchers >= 2 && allrepos[n][o].stargazers_count >= 2){
            topRepos.push(allrepos[n][o]);
          }
        }
        if(topRepos.length >= 2){
          candidates.push(topRepos[0].owner.login);
        }
      }
      // Go to github again and retrieve the info for the candidates that made the cut
      var candidatesInfo = [];
      for (var p = 0; p < candidates.length; p++){
        candidatesInfo.push($.get('https://api.github.com/users/' + candidates[p] +'?access_token=' + apiKey));
      }
      console.log(candidates);
      
      $.when.apply($, candidatesInfo).done(function(){

        for(var q = 0, len = arguments.length; q < len; q++){
          candidatesInformation.push(arguments[q][0]);
        }
        console.log(candidatesInformation);
      }); //end the second when

    }); // End the first when

    console.log('pages: '+ pages);

    console.log('devs: ' + response.total_count);
  }).fail(function(error){
    // displayErrorMessage(username);
  }); // end the initial Github API call
  return candidatesInformation;
};

  // GitHubSearch.prototype.reposLookup = function (){
  //
  // };

  exports.gitHubModule = GitHubSearch;
