// Include React
var React = require('react');

// Include all children components
var Results = require('./children/Results');
var History = require('./children/History');
var Search = require('./children/Search');

// Helper for making AJAX request to our API
var helpers = require('./utils/helpers');

// Create Main Component
var Main = React.createClass({

  // Get initial states
  getInitialState: function() {
    return {
      apiResponse: [], 
      results: [], 
      searchParams: ["", "", ""] 
    };
  },
  _setSearchParams: function(topic, startYear, endYear) {
    this.setState({ searchParams: [topic, startYear, endYear] });
  },
  _updateMongo: function(input) {
    this.setState({ results: input });
  },
  // componentDidMount() doc link: "https://facebook.github.io/react/docs/react-component.html#componentdidmount"
  // When page renders get latest Articles that were saved
  componentDidMount: function() {
    helpers.getArticle().then(function(response) {
      this.setState({ results: response.data});   
    }.bind(this));
  },
  // componentDidUpdate link: https://facebook.github.io/react/docs/react-component.html#componentdidupdate
  // If component changes
  componentDidUpdate: function(prevProps, prevState) {
    // Run query for article search
    if(this.state.searchParams != prevState.searchParams) {
      helpers.runQuery(this.state.searchParams[0], this.state.searchParams[1], this.state.searchParams[2]).then(function(data) {
        this.setState({ apiResponse: data });
      }.bind(this));
    }
  },
  // Render the function
  render: function() {
    return (

      <div>
        <div className="container">

          <div className="row">
             <div className="jumbotron">
                <h2 className="text-center">New York Times Article Finder</h2>
                <p className="text-center">
                  <em>Enter a topic and press submit to search for results (ex: "Michael Jordan").</em>
                </p>
              </div>
          </div>

          <div className="row">
            <Search _setSearchParams = {this._setSearchParams} />
            <Results apiResponse={this.state.apiResponse} _updateMongo={this._resetMongo} />
            <History mongoResults={this.state.results} _updateMongo={this._updateMongo} />
          </div>

        </div>
      </div>
      
    );
  }
});

// Export the component back for use in other files
module.exports = Main;