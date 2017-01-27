var apiKey = require ('./../.env').apiKey;

function GitHubSearch() {

};

function getDevelopers(location, language, response){

  var usernames = [];

  for(var i = 0; i < response.items.length; i++){
    usernames.push(response.items[i].login);
  }
  // Github responses are paginated. If there are more than 100 results, get the additional pages.
  if (response.total_count > 100) {
    var pages = Math.ceil(response.total_count/100);
    for (var j= 2; j <= pages; j++) {
      paginateDevelopers(location, language, j);
    }
  }
  console.log('developers:')
  console.log(allDevelopers);
  return allDevelopers;
}


function paginateDevelopers (location, language, pageNumber){

  var url = 'https://api.github.com/search/users?q=location:' + location + '+followers:%3E50+language:'+ language + '?access_token=' + apiKey +'&page='+ pageNumber +'&per_page=100'

  $.get(url).then(function(response){
          var moreUsers = [];
          for(var k = 0; k < response.items.length; k++){
            moreUsers.push(response.items[k].login);
          }
          console.log(moreUsers);
          return moreUsers;

        }).fail(function(error){
        // displayErrorMessage(username);
        });
}


GitHubSearch.prototype.locationLookup = function(location, language){

  var candidatesInformation = [];

  $.get('https://api.github.com/search/users?q=location:' + location + '+followers:%3E50+language:'+ language + '?access_token=' + apiKey +'&per_page=100').then(function(response){
    var developers = getDevelopers(location, language, response);
    // console.log(developers);
  }).fail(function(error){
    // displayErrorMessage(username);
  }); // end the initial Github API call



    // get all the repos of the developers
    var repos = [];
    for(var l = 0; l < usernames.length; l++){
      repos.push($.get('https://api.github.com/users/' + usernames[l] + '/repos?access_token='+ apiKey + '&per_page=100'));
    }
    console.log('repos: ' + repos);

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
    console.log(usernames);

  return candidatesInformation;
};

  // GitHubSearch.prototype.reposLookup = function (){
  //
  // };

  exports.gitHubModule = GitHubSearch;
