# Hot Reloadable Web Apps with React and Redux

This is a talk given at the [LondonJS](http://www.meetup.com/London-JavaScript-Community/)
meetup group about how hot reloading works and how it is enabled by Elm-style architecture for web apps using React/Redux.

## GitHub Stats Dashboard demo app

This is a demo app to illustrate how to implement hot reloading using React/Redux "from scratch", rather than relying on the existing Webpack plugins.

There are a few things you should bear in mind if you want
to use the code here as a basis for supporting hot reloading
and similar debug tools in your own app:

* The code here is intended to be explicit for people who
  are not familiar with Redux's API. See the [Redux video tutorial](https://egghead.io/series/getting-started-with-redux)
  and examples for a guide that explains best practices for structuring your app.

* The code here is written with classic ES5-era JavaScript
  for simplicity.
  ES2015 provides a number of features which make writing
  functional code easier.

* Rather than wrapping React components manually to
  preserve local state between updates, you can use
  the [react-transform-hmr](https://github.com/gaearon/react-transform-hmr)
  plugin for Webpack

## Setup

1. Install and start the app

  ```
  npm install
  npm start
  open http://localhost:8080
  ```

2. Enter 'organization/repository' (eg. 'jquery/jquery') in the box
   for one of the charts and click 'Fetch Stats'

3. Open the 'ActivityChart.js' source file and in the `convertCommitStats()`
   function, change the values for the `strokeColor` or `fillColor` properties.

4. Switch back to the app. You should see the code changes reflected
   live and the state of the app preserved.

## Hot Reloading Limitations and Caveats

These are notes on various limitations and caveats with the current
version of the Hot Reloading tools (stable releases of React, Webpack etc.
as of 30/01/16) that I encountered whilst preparing this talk which you
might wish to be aware of:

* Errors during the render() function in a component can leave React
  in an unstable state, requiring a full reload.
  See https://github.com/facebook/react/issues/3313

  One solution to this is to use the `react-transform-catch-errors`
  Babel plugin: https://github.com/gaearon/react-transform-catch-errors

* `react-transform-hmr` does not support stateless functional components,
  see https://github.com/gaearon/react-transform-hmr/blob/master/README.md
  and https://github.com/gaearon/babel-plugin-react-transform/issues/57

## Learning Resources

 * [Redux Glossary](https://github.com/rackt/redux/blob/master/docs/Glossary.md)
