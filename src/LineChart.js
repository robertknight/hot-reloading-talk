var React = require('react');

var wrapExportedComponents = require('./wrapExportedComponents');

/**
  * A React component wrapper around a
  * [Chart.js](http://www.chartjs.org/) line
  * chart.
  */
var LineChart = React.createClass({
  _updateChart: function () {
    if (this._chart) {
      this._chart.destroy();
    }

    var data = this.props.data;
    var options = this.props.options;
    var ctx = this.refs['chart'].getContext('2d');
    this._chart = new window.Chart(ctx).Line(data, options);
  },

  componentDidMount: function () {
    this._updateChart();
  },

  componentWillUnmount: function () {
    if (this._chart) {
      this._chart.destroy();
    }
  },

  componentDidUpdate: function () {
    this._updateChart();
  },

  render: function () {
    var className = this.props.className;
    var width = this.props.width;
    var height = this.props.height;
    return <canvas className={className} ref="chart" width={width} height={height}/>;
  },
});

module.exports = LineChart;
wrapExportedComponents(module);
