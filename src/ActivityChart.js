var React = require('react');

var LineChart = require('./LineChart');

var actions = require('./actions');
var materialDesignElements = require('./materialDesignElements');
var hotReloadSupport = require('./hotReloadSupport');

var Button = materialDesignElements.Button;
var Spinner = materialDesignElements.Spinner;
var TextField = materialDesignElements.TextField;

/**
 * Returns an approximate conversion of a relative week age
 * to date.
 */
function weekIndexToDateString(weeksAgo) {
  var now = Date.now();
  var age = weeksAgo * 7 * 24 * 60 * 60 * 1000;
  return (new Date(now - age)).toLocaleDateString();
}

/**
 * Convert an Array<{week: number, commits: number}>
 * into a data structure for a Chart.JS chart.
 */
function convertCommitStats(repo, commits, options) {

  return {
    labels: commits.map(function (commit) {
      if (options.showWeekDates) {
        var weeksAgo = 52 - commit.week;
        return weekIndexToDateString(weeksAgo);
      } else {
        return '';
      }
    }),
    datasets: [{
      label: repo,
      strokeColor: options.lineColor,
      fillColor: 'transparent',
      data: commits.map(function (commit) {
        return commit.commits;
      }),
    }],
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
    return <div className={centeredClasses}>
      <form className="u-layout-row u-cross-center" onSubmit={onChangeRepo}>
        <TextField name="repo" placeholder="organization/repository"/>
        <input className="mdl-button mdl-js-button" type="submit" value="Fetch Stats"/>
      </form>
    </div>;
  }

  if (props.error) {
    return <div className={centeredClasses}>
      <div>
      Fetching repository activity for <i>{props.repo}</i> failed: {props.error}
      </div>
      <Button onClick={onResetClick}>Reset</Button>
    </div>;
  }

  if (props.isLoading) {
    return <div className={centeredClasses}>
      <Spinner/>
    </div>;
  }

  var chartData = convertCommitStats(props.repo,
    props.data.commitsByWeek, {
      lineColor: props.lineColor,
      showWeekDates: props.isZoomed,
    });

  var chartOptions = {
    pointDot: false,
    showTooltips: false,
    datasetStrokeWidth: 3,
  };

  return <div className={classes}>
    <div className="Header">Weekly commits for <span className="Header__repo">{props.repo}</span></div>
    <div className="ActivityChart__content u-layout-col u-stretch">
      <LineChart
        className="ActivityChart__chart"
        data={chartData}
        options={chartOptions}/>
    </div>
    <div className="mdl-card__actions mdl-card--border">
      <Button onClick={onResetClick}>Reset</Button>
      <Button onClick={onZoomClick}>{props.isZoomed ? 'Zoom Out' : 'Zoom In'}</Button>
    </div>
  </div>;
}

module.exports = hotReloadSupport.catchErrors(ActivityChart);
