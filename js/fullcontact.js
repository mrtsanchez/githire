
function FullContactSearch() {

}

FullContactSearch.prototype.devsLookup = function(email, githubProfile, displayProfile){

  var twitterHandle;

  var url = 'https://api.fullcontact.com/v2/person.json?email=' + email + '&apiKey=41c5b4d6ca4abb13';

  $.getJSON(url).then(function(responseJSON) {
    // for (var i = 0; i < responseJSON.socialProfiles.length; i++){
    //   if (responseJSON.socialProfiles[i].type === "twitter"){
    //     twitterHandle = responseJSON.socialProfiles[i].url;
    //   }
    // }
    console.log(responseJSON);
    displayProfile(responseJSON, githubProfile);
  });

};


exports.fullContactModule = FullContactSearch;
