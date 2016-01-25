# Hot Reloadable Web Apps with React and Redux

This is a talk given at the [LondonJS](http://www.meetup.com/London-JavaScript-Community/)
meetup group about the UI architecture of React/Redux applications and how
it enables hot reloading and useful debugging tools.

## GitHub Stats Dashboard demo app

This is a demo app to illustrate how React/Redux-style
architecture for UIs enables hot reloading and useful
debugging tools.

There are a few things you should bear in mind if you want
to use the code here as a basis for supporting hot reloading
and similar debug tools in your own app:

* The code here is intended to be explicit for people who
  are not familiar with Redux's API. Redux and React Redux provide
  utilities for adding middleware (eg. for logging actions), passing
  data from the store to components and enabling
  efficient updates which you should use instead.

  See [react-redux](https://github.com/rackt/react-redux) for
  more information.

* The code here is written with classic ES5-era JavaScript
  for simplicity.
  ES2015 provides a number of features which make writing
  functional code easier.

* Rather than wrapping React components manually to
  preserve local state between updates, you can use
  the [react-transform-hmr](https://github.com/gaearon/react-transform-hmr)
  plugin for Webpack

## Setup

```
npm install

# Start development server
# (the --hot option adds the client-side Hot Module Reloading plugin
#  to the Webpack bundle)
npm start
open http://localhost:8080
```

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
