var actions = require('./actions');

/**
 * Model for a single chart
 */
function chartReducer(state, action) {
  if (!state) {
    return {
      repo: undefined,
      isLoading: false,
      data: undefined,
    };
  }

  var types = actions.types;

  switch (action.type) {
    case types.SET_REPO:
      return Object.assign({}, state, {
        repo: action.repo,
        data: undefined,
        error: undefined,
      });
    case types.FETCH_COMMIT_STATS:
      return Object.assign({}, state, {
        isLoading: true,
        error: undefined,
      });
    case types.FETCH_COMMIT_STATS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        data: action.data,
        error: undefined,
      });
    case types.FETCH_COMMIT_STATS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error.message,
      });
    default:
      return state;
  }
}

/**
 * Model for a set of charts.
 */
function chartSetReducer(state, action) {
  if (!state) {
    // initialize the model for each individual chart
    var charts = [];
    for (var i=0; i < 4; i++) {
      charts.push(chartReducer(undefined, action));
    }
    return {
      charts: charts,
      zoomedChart: undefined,
    };
  }

  switch (action.type) {
    case actions.types.FOCUS_CHART:
      return Object.assign({}, state, {
        zoomedChart: action.chartIndex,
      });
    case actions.types.UNFOCUS_CHART:
      return Object.assign({}, state, {
        zoomedChart: undefined,
      });
    default:
      if (typeof action.chartIndex !== 'undefined') {
        // Delegate state updates to chart model
        var newCharts = state.charts.slice();
        newCharts.splice(action.chartIndex, 1, chartReducer(state.charts[action.chartIndex], action));
        return Object.assign({}, state, {
          charts: newCharts,
        });
      }
      return state;
  }
}

module.exports = chartSetReducer;
