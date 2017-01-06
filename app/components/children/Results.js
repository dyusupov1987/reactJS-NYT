// Include React
var React = require("react");

// Helper for making AJAX request to our API
var helpers = require('../utils/helpers');

// Creating the Results component
var Results = React.createClass({
  
  // Set generic state associated with the text being searched
  getInitialState: function() {
    return {
     articlesArray: []
    };
  },  

  _handleSave: function(event){
    var articleId = event.target.value;
    var saveArticleObject;
    for(var i=0; i<this.state.articlesArray.length; i++) {
      if(this.state.articlesArray[i].id == articleId) {
        saveArticleObject = this.state.articlesArray[i];
      }
    }
    // Make "this" into "that" to access the components inside helper functions
    var that =this;
    helpers.saveArticle(saveArticleObject).then(function() {
      helpers.getArticle().then(function(search) {
        that.props._updateMongo(search.data);
      });
    }.bind(this));
  },

  // Here we render the function
  render: function() {
    // http://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
    var that = this;

    return (

    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title text-center">Results</h3>
      </div>
      <div className="panel-body text-center">
        <ul className="list-group col-md-8 col-md-offset-2">
            
          {this.props.apiResponse.map(function(search, i) {
            // Build array of articles
            that.state.articlesArray.push({
              id: search._id,
              title: search.headline.main,
              date: search.pub_date,
              url: search.web_url
            });
            return 
            (

              <li key={search._id} className="list-group-item" style={ {borderWidth: "0px"} }>
                <div className="input-group">
                  <div type="text" className="form-control">
                    <b><a href={search.web_url} target="_new" style={ {color: "black"} }>{search.headline.main}</a></b>
                    <i> {search.pub_date.substring(0, 10)}</i>
                  </div>       
                  <span className="input-group-btn">
                    <button className="btn btn-success" type="button" onClick={that._handleSave} value={search._id}>Save</button>
                  </span>
                </div>
              </li>

            );
          })}

        </ul>



      </div>
    </div>

    );
  }
});

// Export 
module.exports = Results;

