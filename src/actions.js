var GITHUB_API_ROOT = 'https://api.github.com';

/**
 * The types of actions that can be performed on a single
 * ActivityChart
 */
var types = {
  SET_REPO: 'SET_REPO',
  FETCH_COMMIT_STATS: 'FETCH_COMMIT_STATS',
  FETCH_COMMIT_STATS_SUCCESS: 'FETCH_COMMIT_STATS_SUCCESS',
  FETCH_COMMIT_STATS_ERROR: 'FETCH_COMMIT_STATS_ERROR',
  FOCUS_CHART: 'FOCUS_CHART',
  UNFOCUS_CHART: 'UNFOCUS_CHART',
};

/**
 * Fetches commit statistics for a GitHub repository.
 * It dispatches SET_REPO initially,
 * then FETCH_COMMIT_STATS and either FETCH_COMMIT_STATS_SUCCESS
 * or FETCH_COMMIT_STATS_ERROR once the request completes.
 */
function selectRepo(dispatch, repo) {
  dispatch({
    type: types.SET_REPO,
    repo: repo,
  });
  dispatch({
    type: types.FETCH_COMMIT_STATS,
  });

  var statsURL = GITHUB_API_ROOT + '/repos/' + repo + '/stats/participation';
  var response;

  fetch(statsURL).then(function (_response) {
    response = _response;
    return response.json();
  }).then(function (apiData) {
    if (response.status !== 200) {
      throw new Error(apiData.message);
    }

    var data = {
      commitsByWeek: apiData.all.map(function (commitCount, weekIndex) {
        return {
          week: weekIndex,
          commits: commitCount,
        };
      }),
    };

    try {
      dispatch({
        type: types.FETCH_COMMIT_STATS_SUCCESS,
        data: data,
      });
    } catch (err) {
      console.error('Error reporting stats', err);
    }
  }).catch(function (err) {
    dispatch({
      type: types.FETCH_COMMIT_STATS_ERROR,
      error: err,
    });
  });
}

/** Returns an action which resets the repository for a chart. */
function resetRepo() {
  return { type: types.SET_REPO, repo: undefined };
}

/** Returns an action which zooms in to a chart. */
function focusChart() {
  return { type: types.FOCUS_CHART };
}

/** Returns an action which zooms out from a single chart. */
function unfocusChart() {
  return { type: types.UNFOCUS_CHART };
}

module.exports = {
  types: types,
  resetRepo: resetRepo,
  selectRepo: selectRepo,
  focusChart: focusChart,
  unfocusChart: unfocusChart,
};
