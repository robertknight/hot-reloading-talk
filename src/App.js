var React = require('react');

var ActivityChart = require('./ActivityChart');
var hotReloadSupport = require('./hotReloadSupport');

/**
 * Root component for the application which renders
 * a set of Git commit statistics charts.
 */
var App = React.createClass({
  render: function () {
    var dispatch = this.props.dispatch;
    var state = this.props.state;

    var colors = ['red', 'green', 'blue', 'black'];

    function renderChart(index) {
      var chart = state.charts[index];

      // Wrap the dispatch function for each chart to
      // 'tag' actions with the chart they are associated with.
      //
      // This pattern is taken from Elm, where the ability to
      // 'tag' a value with additional information and then later
      // extract that tag is a built-in language feature
      var chartDispatch = function (action) {
        dispatch(Object.assign(action, {chartIndex: index}));
      };

      return <ActivityChart
        dispatch={chartDispatch}
        isLoading={chart.isLoading}
        data={chart.data}
        repo={chart.repo}
        error={chart.error}
        lineColor={colors[index]}
        isZoomed={index === state.zoomedChart}
      />;
    }

    if (typeof state.zoomedChart === 'number') {
      return <div className="u-layout-col u-cross-center">
      {renderChart(state.zoomedChart, true)}
      </div>;
    }

    return <div className="u-layout-col u-cross-center">
      <div className="u-layout-row">
        {renderChart(0)}
        {renderChart(1)}
      </div>
      <div className="u-layout-row">
        {renderChart(2)}
        {renderChart(3)}
      </div>
    </div>;
  },
});

module.exports = hotReloadSupport.catchErrors(App);
