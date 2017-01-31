var apiKey = require ('./../.env').apiKey;

function GitHubSearch() {

}

function getDevelopers(location, language, pageNumber){
  return $.get('https://api.github.com/search/users?q=location:' + location + '+type:users+followers:>50+created:<2012-01-01+language:' + language + '?access_token=' + apiKey +'&page='+ pageNumber +'&per_page=100');
}

function getRepos(username){
  return $.get('https://api.github.com/users/' + username + '/repos?access_token='+ apiKey + '&sort=push&type=owner&per_page=100');
}

GitHubSearch.prototype.devsLookup = function(location, language){

  (getDevelopers(location,language, 1)).then(function(response){

    var totalDevs = response.total_count;

    console.log(totalDevs);

    var devs = [];
    var pages = Math.ceil(totalDevs/100);
    for (var l= 1; l <= pages; l++) {
      devs.push(getDevelopers(location,language,l));
    }

    $.when.apply($, devs).then(function(){
      var usernames = [];
      for(var q = 0, len = arguments.length; q < len; q++){
        for (var i = 0; i < arguments[q][0].items.length; i++){
          usernames.push(arguments[q][0].items[i].login);
        }
      }
      console.log(usernames);
      var repos = [];
      for (var j = 0; j < usernames.length; j++) {
        repos.push(getRepos(usernames[j]));
      }
      // extract the actual repos from the array of objects created in the last step
      $.when.apply($, repos).done(function(){
        var allrepos = [];
        for(var m = 0, len = arguments.length; m < len; m++){
          allrepos.push(arguments[m][0]);
        }
        console.log(allrepos);
      }); // End of the second when

    }); // End of the first when



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
