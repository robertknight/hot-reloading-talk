var redux = require('redux');
var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./App');
var DevTools = require('./DevTools');
var rootReducer = require('./reducers');

// Require our app's styles. Webpack's "style"
// loader has built-in support for hot reloading
require('./style.css');

// Create the Redux store. Returns an object a handful
// of functions:
//
//  - store.getState() returns the current, immutable state tree
//  - store.dispatch() passes an action through rootReducer in order
//    to update the state
//  - store.subscribe() adds a listener for state changes
//  - store.replaceReducer() can be used to replace the root reducer
//    for hot reloading
//
var initialState = undefined;
var store = redux.createStore(rootReducer, initialState, DevTools.instrument());
var rootView;

// Setup a simple logging function for debugging.
//
// Every time an action is dispatched, it will be logged
// before the view is updated.
var originalDispatch = store.dispatch;
store.dispatch = function (action) {
  console.log('Dispatching action', action);
  originalDispatch(action);
};

// Expose the store on the window object for
// debugging purposes
window.ReduxStore = store;

/**
 * Render the view, using the current
 * state from @p store.
 */
function render(store) {
  var state = store.getState();
  var dispatch = store.dispatch;
  rootView = ReactDOM.render(<div>
    <div className="GitLink">
      <a href="https://github.com/robertknight/hot-reloading-talk">
      github.com/robertknight/hot-reloading-talk
      </a>
    </div>
    <div className="DevToolsHint">
      Press <b>Shift + D</b> to toggle the Redux development tools or
      {' '} <b>Shift + P</b> to reposition them.
    </div>
    <DevTools store={store}/>
    <App dispatch={dispatch} state={state}/>
    </div>,
    document.getElementById('root'));
}

// Re-render the view whenever the app state changes
store.subscribe(function () {
  render(store);
});
// Perform the initial render of the app
render(store);

// Set up Hot Module Reloading (HMR)
if (module.hot) {
  // When the actions or reducers change, replace them
  // but keep the current app state
  module.hot.accept('./reducers', function () {
    console.log('Store updated. Replacing root reducer');
    // NOTE: If the callback to module.hot.accept throws
    // an exception, the HMR update will fail. If using
    // webpack-dev-server, the page will be reloaded.
    // Therefore we wrap the update in a try..catch block.
    try {
      var newReducer = require('./reducers');
      store.replaceReducer(newReducer);
    } catch (err) {
      console.error('Error updating store', err);
    }
  });

  // When the view changes, replace the current
  // root view App component with the updated
  // version and re-render
  module.hot.accept('./App', function () {
    // Wrap the update in a try-catch blog to avoid
    // a complete reload if the update fails (eg.
    // due to a syntax or logic error in the new version)
    try {
      App = require('./App');

      // Re-render the view.
      //
      // NOTE: Because the _type_ of the root component
      // (the value of 'App' has changed), React will replace
      // the entire DOM and lose any temporary state, such as
      // text in input fields.
      //
      // This can be avoided by wrapping view components
      // with proxies which can change the component that
      // they actually render without losing state.
      //
      // This is implemented by the 'react-proxy' library
      // which in turn is used by the 'react-transform-hmr'
      // library that enables hot reloading of React components
      // without changes to your own code
      render(store);
    } catch (err) {
      // NOTE: If any errors occur during the render() phase this
      // currently leaves the render tree in a broken state,
      // see https://github.com/facebook/react/issues/3313 and
      // https://github.com/facebook/react/issues/2461
      //
      // This is partially mitigated by wrapping components to catch
      // errors during render() calls and render an alternative component
      // instead.
      console.error('Error updating view. You may need to do a full reload',
        err);
    }
  });
}
