webpackHotUpdate(0,{

/***/ 170:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(12);

	var Chart = __webpack_require__(171);

	var actions = __webpack_require__(214);
	var materialDesignElements = __webpack_require__(215);

	var Button = materialDesignElements.Button;
	var Spinner = materialDesignElements.Spinner;
	var TextField = materialDesignElements.TextField;

	/**
	 * Convert an Array<{week: number, commits: number}>
	 * into a data structure for a Chart.JS chart.
	 */
	function convertCommitStats(repo, commits, lineColor) {
	  return {
	    labels: commits.map(function (commit) {
	      return commit.week.toString();
	    }),
	    datasets: [{
	      label: repo,
	      strokeColor: lineColor,
	      fillColor: 'red',
	      data: commits.map(function (commit) {
	        return commit.commits;
	      })
	    }]
	  };
	}

	/**
	 * A chart which displays commit activity from a GitHub
	 * project.
	 */
	function ActivityChart(props) {
	  function onChangeRepo(event) {
	    event.preventDefault();
	    var repo = event.target['repo'].value;
	    actions.selectRepo(props.dispatch, repo);
	  }

	  function onResetClick() {
	    props.dispatch(actions.resetRepo());
	  }

	  function onZoomClick() {
	    if (props.isZoomed) {
	      props.dispatch(actions.unfocusChart());
	    } else {
	      props.dispatch(actions.focusChart());
	    }
	  }

	  var classes = "ActivityChart mdl-card mdl-shadow--2dp u-layout-col";
	  var centeredClasses = classes + ' u-cross-center u-main-center';

	  if (props.isZoomed) {
	    classes += ' ActivityChart--zoomed';
	  }

	  if (!props.repo) {
	    return React.createElement(
	      'div',
	      { className: centeredClasses },
	      React.createElement(
	        'form',
	        { className: 'u-layout-row u-cross-center', onSubmit: onChangeRepo },
	        React.createElement(TextField, { name: 'repo', placeholder: 'organization/repository' }),
	        React.createElement('input', { className: 'mdl-button mdl-js-button', type: 'submit', value: 'Fetch Stats' })
	      )
	    );
	  }

	  if (props.error) {
	    return React.createElement(
	      'div',
	      { className: centeredClasses },
	      React.createElement(
	        'div',
	        null,
	        'Fetching repository activity for ',
	        React.createElement(
	          'i',
	          null,
	          props.repo
	        ),
	        ' failed: ',
	        props.error
	      ),
	      React.createElement(
	        Button,
	        { onClick: onResetClick },
	        'Reset'
	      )
	    );
	  }

	  if (props.isLoading) {
	    return React.createElement(
	      'div',
	      { className: centeredClasses },
	      React.createElement(Spinner, null)
	    );
	  }

	  var chartData = convertCommitStats(props.repo, props.data.commitsByWeek, props.lineColor);

	  var chartOptions = {
	    pointDot: false,
	    showTooltips: false,
	    datasetStrokeWidth: 3
	  };

	  return React.createElement(
	    'div',
	    { className: classes },
	    React.createElement(
	      'div',
	      { className: 'Header' },
	      'Weekly commits for ',
	      React.createElement(
	        'span',
	        { className: 'Header__repo' },
	        props.repo
	      )
	    ),
	    React.createElement(
	      'div',
	      { className: 'ActivityChart__content u-layout-col u-stretch' },
	      React.createElement(Chart, { className: 'ActivityChart__chart', data: chartData, options: chartOptions })
	    ),
	    React.createElement(
	      'div',
	      { className: 'mdl-card__actions mdl-card--border' },
	      React.createElement(
	        Button,
	        { onClick: onResetClick },
	        'Reset'
	      ),
	      React.createElement(
	        Button,
	        { onClick: onZoomClick },
	        props.isZoomed ? 'Zoom Out' : 'Zoom In'
	      )
	    )
	  );
	}

	module.exports = ActivityChart;

/***/ }

})