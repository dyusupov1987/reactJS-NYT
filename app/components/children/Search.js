// Include React
var React = require("react");

// Helper for making AJAX request to our API
var helpers = require('../utils/helpers');

// Creating the Form component
var Search = React.createClass({ 

  // Set generic state associated with the text being searched
  getInitialState: function() {
    return {
      topic: "",
      startYear: "",
      endYear: ""
    };
  },

  // When a user submits...
  _handleSubmit: function(event) {
    // prevents HTML from trying to submit form, if user hits "Enter" instead of pressing button
    
    event.preventDefault();

    // Set the parent to have the search terms
    this.props._setSearchParams(this.state.topic, this.state.startYear, this.state.endYear);
  },

  _handleTopicChange: function(event) {
    this.setState({topic: event.target.value});
  },

  _handleStartYearChange: function(event) {
    this.setState({startYear: event.target.value});
  },

  _handleEndYearChange: function(event) {
    this.setState({endYear: event.target.value});
  },
  // Describe component's render method
  render: function() {
    return (

      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Article Search</h3>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this._handleSubmit}>

            <div className="form-group col-sm-offset-3 col-sm-6">
              <label htmlFor="topic" className="text-center">Topic</label>
              <input type="text" className="form-control text-center" id="topic" onChange={this._handleTopicChange} />
            </div>
            <br />

            <div className="form-group col-sm-offset-3 col-sm-6">
              <label htmlFor="startYear">Start Year</label>
              <input type="text" className="form-control text-center" id="startYear" onChange={this._handleStartYearChange} />
            </div>
            <br />

            <div className="form-group col-sm-offset-3 col-sm-6">
              <label htmlFor="endYear">End Year</label>
              <input type="text" className="form-control text-center" id="endYear" onChange={this._handleEndYearChange} />
            </div>
            <br />

            <button type="submit" className="btn btn-success col-sm-offset-5 col-sm-2" id="searchBtn">Search</button>

          </form>
        </div>
      </div>

    );
  }
});

// Export component back for use in other files
module.exports = Search;

