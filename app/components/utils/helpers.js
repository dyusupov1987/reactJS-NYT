// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// Function serves as NYT API Request for rendered components
var runQuery = function(search, beginYear, endYear) {
  console.log(search);
  // Variables for authentication key obtained from NYT API and the queryURL for 
  // API to redirect to based off the dynamic content a user inputs.
  // Also input start day for beginning and end of each year into query
  var authKey = "e6155b0f85574901ab7115f47cc4e3f2";
  var queryURL ="https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" +
                  search + "&begin_date=" + beginYear + "0101" + "&end_date=" + endYear + "1231";
  // JavaScript Promise refer to: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
  return new Promise(function (fulfill,reject) {
    // Axios GET request to NYT
    axios.get(queryURL).then(function(response) {
      var resultsArray = [];
      // If result exists, only return top 6 articles
      if (response.data.response.docs[0]) {
        for (var i=0; I<response.data.response.docs.length; i++) {

          if (i==6) {
            break; // Breaks out of loop once 6 results are returned
          }
          else {
            // Else, push to results array
            resultsArray.push(response.data.response.docs[i]);
          }
        }
        // Return array of results
        fulfill(resultsArray);
      }
      else {
        // If no results are returned, return an empty string
        reject("");
      }
    });
  });
}

// Axios API POST Request 
var saveArticle = function(articleObject) {
  var apiURL = window.location.origin + '/api/saved';
  return new Promise(function (fulfill,reject) {
    // link: "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams"
    var params = new URLSearchParams();
    params.append('title', articleObject.title);
    params.append('date', articleObject.date);
    params.append('url', articleObject.url);
    axios.post(apiURL, params).then(function(response) {
      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }
    });  
  });
}

// Axios GET Request 
var getArticle = function() {
  // Get API Post URL 
  var apiURL = window.location.origin + '/api/saved';
  return new Promise(function (fulfill,reject) {
    // Re-format article object to match Mongo Article Model
    axios.get(apiURL).then(function(response) {
      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }
    }); 
  }); 
}

// Axios POST Request to delete articles from MongoDB
var deleteArticle = function(articleId) {
  var apiURL = window.location.origin + '/api/delete/' + articleId;
  return new Promise(function (fulfill, reject) {
    axios.post(apiURL).then(function(response) {
        if(response){
        fulfill(response);
      }
      else{
        reject("");
      }
    });
  });
}

// Export helper functions
module.exports = {
  runQuery,
  saveArticle,
  getArticle,
  deleteArticle
}




