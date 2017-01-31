var apiKey = require ('./../.env').apiKey;

function GitHubSearch() {

}

function getDevelopers(location, language, response){

  // for(var i = 0; i < response.items.length; i++){
  //   usernames.push(response.items[i].login);
  // }
  // Github responses are paginated. If there are more than 100 results, get the additional pages.
  if (response.total_count > 1000) {
    var usernames = [];
    for (var j = 2; j < 10; j++) {
      $.when(paginateDevelopers(location, language, j)).done(function(devs){
        for(var k = 0; k < devs.items.length; k++){
          usernames.push(devs.items[k].login);
        }
      });
    }
  } else if (response.total_count > 100) {
    var usernames = [];
    var pages = Math.ceil(response.total_count/100);
    for (var l= 1; l <= pages; l++) {
      $.when(paginateDevelopers(location, language, l)).done(function(devs){
        for(var m = 0; m < devs.items.length; m++){
          usernames.push(devs.items[m].login);
        }
      });
    }
  }

return usernames;

}

function paginateDevelopers(location, language, pageNumber){
  return $.get('https://api.github.com/search/users?q=location:' + location + '+type:users+followers:>80+created:<2012-01-01+language:' + language + '?access_token=' + apiKey +'&page='+ pageNumber +'&per_page=100');
}

function getRepos(username){
  return $.get('https://api.github.com/users/' + username + '/repos?access_token='+ apiKey + '&sort=push&type=owner&per_page=30');
}

GitHubSearch.prototype.devsLookup = function(location, language){

  $.get('https://api.github.com/search/users?q=location:' + location + '+type:users+followers:>80+created:<2012-01-01+language:'+ language + '?access_token=' + apiKey +'&per_page=100').then(function(response){
    console.log(response.total_count);
    var devs = getDevelopers(location, language, response);




    // $.when(getDevelopers(location, language, response)).done(function(usernames){
    //   console.dir(usernames);
    //   console.log(usernames.length);
    //
    // }); // end of the first when
  }); // end the initial Github API call



    // extract the actual repos from the array of objects created in the last step
    // $.when.apply($, repos).done(function(){
    //   var allrepos = [];
    //   for(var m = 0, len = arguments.length; m < len; m++){
    //     allrepos.push(arguments[m][0]);
    //   }
    //   console.log(allrepos);
    //
    //   var candidates = [];
    //
    //   // Filter the candidates by their repos
    //   for(var n = 0; n < allrepos.length; n++){
    //     var topRepos = [];
    //     for (var o = 0; o < allrepos[n].length; o++){
    //       if (allrepos[n][o].language === language && allrepos[n][o].forks_count >= 2 && allrepos[n][o].watchers >= 2 && allrepos[n][o].stargazers_count >= 2){
    //         topRepos.push(allrepos[n][o]);
    //       }
    //     }
    //     if(topRepos.length >= 2){
    //       candidates.push(topRepos[0].owner.login);
    //     }
    //   }
    //   // Go to github again and retrieve the info for the candidates that made the cut
    //   var candidatesInfo = [];
    //   for (var p = 0; p < candidates.length; p++){
    //     candidatesInfo.push($.get('https://api.github.com/users/' + candidates[p] +'?access_token=' + apiKey));
    //   }
    //   console.log(candidates);
    //
    //   $.when.apply($, candidatesInfo).done(function(){
    //
    //     for(var q = 0, len = arguments.length; q < len; q++){
    //       candidatesInformation.push(arguments[q][0]);
    //     }
    //     console.log(candidatesInformation);
    //   }); //end the second when
    //
    // }); // End the first when



  // return candidatesInformation;
};

  // GitHubSearch.prototype.reposLookup = function (){
  //
  // };

  exports.gitHubModule = GitHubSearch;
