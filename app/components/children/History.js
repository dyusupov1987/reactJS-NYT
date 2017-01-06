// Include React
var React = require("react");

// Helper for making AJAX request to our API
var helpers = require('../utils/helpers');

// This is the History component. It will be used to show a log of  recent searches.
var History = React.createClass({
 
  // Set a generic state
  getInitialState: function() {
    return {
      necessary: false
    };
  },

  _handleDelete: function(event) {
    var articleId = event.target.value;
    var that = this;
    helpers.deleteArticle(articleId).then(function() {
      helpers.getArticle().then(function(search) {
        that.props._updateMongo(search.data);
      });
    });
  },
  
 // Here we describe this component's render method
  render: function() {

    var that= this;
    return (
      
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved Articles</h3>
        </div>
        <div className="panel-body text-center">

          <ul className="list-group col-sm-8 col-sm-offset-2">
            {this.props.mongoResults.map(function(search, i) {
              return (

                <li key={search._id} className="list-group-item" style={ {borderWidth: "0px"} }>
                  <div className="input-group">
                    <div type="text" className="form-control">
                      <b><a href={search.url} target="_new" style={ {color: "black"} }>{search.title}</a></b>
                      <i> {search.date.substring(0, 10)}</i>
                    </div>
                    <span className="input-group-btn">
                      <button className="btn btn-danger" type="button" onClick={that._handleDelete} value={search._id}>Remove</button>
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

// Export the component back for use in other files
module.exports = History;


