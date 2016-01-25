var React = require('react');

var reduxDevTools = require('redux-devtools');

var LogMonitor = require('redux-devtools-log-monitor').default;
var DockMonitor = require('redux-devtools-dock-monitor').default;

// NOTE: LogMonitor's preserveScrollTop attribute
// is disabled here because it performs internal setup that
// triggers a dispatch every second.
// In a well-written React/Redux app
// that's not a problem because only the components
// whose input state changes will update, but it is
// a nuisance for our purposes when using the debugger
// to monitor activity.
var DevTools = reduxDevTools.createDevTools(
  <DockMonitor toggleVisibilityKey='shift-d' changePositionKey='shift-p'>
    <LogMonitor theme='tomorrow' preserveScrollTop={false}/>
  </DockMonitor>
);

module.exports = DevTools;
