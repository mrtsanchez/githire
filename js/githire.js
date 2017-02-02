var apiKey = require ('./../.env').apiKey;

function GitHubSearch() {

}

function getDevelopers(location, language, experience, pageNumber){
  if (experience === "entry") {
    return $.get('https://api.github.com/search/users?q=location:' + location + '+type:users+created:>2016-01-01+language:' + language + '?access_token=' + apiKey +'&page='+ pageNumber +'&per_page=100');
  } else if (experience === "junior") {
    return $.get('https://api.github.com/search/users?q=location:' + location + '+type:users+followers:>10+created:>2012-01-01+language:' + language + '?access_token=' + apiKey +'&page='+ pageNumber +'&per_page=100');
  } else {
    return $.get('https://api.github.com/search/users?q=location:' + location + '+type:users+followers:>50+created:<2012-01-01+language:' + language + '?access_token=' + apiKey +'&page='+ pageNumber +'&per_page=100');
  }
}

function getRepos(username){
  return $.get('https://api.github.com/users/' + username + '/repos?access_token='+ apiKey + '&sort=push&type=owner&per_page=100');
}

GitHubSearch.prototype.devsLookup = function(location, language, experience, displayResults){

  var candidatesInformation = [];

  (getDevelopers(location,language, experience, 1)).then(function(response){

    var totalDevs = response.total_count;

    console.log(totalDevs);

    var devs = [];
    var pages = Math.ceil(totalDevs/100);
    if (pages > 10) {
      for (var l= 1; l <= 10; l++) {
        devs.push(getDevelopers(location,language, experience, l));
      }
    } else {
      for (var l= 1; l <= pages; l++) {
        devs.push(getDevelopers(location,language, experience, l));
      }
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

        var candidates = [];

        // Filter the candidates by their repos
        for(var n = 0; n < allrepos.length; n++){
          var topRepos = [];
          if (experience === "entry") {
            for (var o = 0; o < allrepos[n].length; o++){
              if (allrepos[n][o].language === language && allrepos[n][o].watchers >= 1){
                topRepos.push(allrepos[n][o]);
              }
            }
            if(allrepos[n].length >= 40 && topRepos.length >= 2){
              candidates.push(topRepos[0].owner.login);
            }
            } else if (experience === "junior") {
              for (var o = 0; o < allrepos[n].length; o++){
                if (allrepos[n][o].language === language && allrepos[n][o].forks_count >= 2 && allrepos[n][o].watchers >= 2){
                  topRepos.push(allrepos[n][o]);
                }
              }
              if(topRepos.length >= 5){
                candidates.push(topRepos[0].owner.login);
              }
            } else {
              for (var o = 0; o < allrepos[n].length; o++){
                if (allrepos[n][o].language === language && allrepos[n][o].forks_count >= 1 && allrepos[n][o].watchers >= 10 && allrepos[n][o].stargazers_count >= 2){
                  topRepos.push(allrepos[n][o]);
                }
              }
              if(topRepos.length >= 2){
                candidates.push(topRepos[0].owner.login);
            }
          }
        }

        console.log(candidates);


        // Go to github again and retrieve the info for the candidates that made the cut
        var candidatesData = [];

        for (var p = 0; p < candidates.length; p++){
          candidatesData.push($.get('https://api.github.com/users/' + candidates[p] +'?access_token=' + apiKey));
        }

        $.when.apply($, candidatesData).done(function(){

          for(var k = 0, len = arguments.length; k < len; k++){
            candidatesInformation.push(arguments[k][0]);
          }

          console.log(candidatesInformation);
          displayResults(candidatesInformation);

        }); // End of the third when

      }); // End of the second when

    }); // End of the first when
  }).fail(function(error){
  // displayErrorMessage(username);
  }); // end the initial Github API call

}

exports.gitHubModule = GitHubSearch;
