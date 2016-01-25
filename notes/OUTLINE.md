## Outline

1. Bio & Intro
1. Hot reloading demo
1. Talk outline
1. How hot reloading works, an explanation of the Webpack HMR implementation
   and API.
1. Hot reloading views - the simple case of rendering only the view
1. The problem with hot view reloading and stateful components
1. Enter redux
1. Basic principles of redux
1. Simple debug tools you can build with Redux (eg. serializing state to
   window.localStorage)
1. Hot reloading + redux: replaceReducer()
1. Time travel and debug tools
1. Remaining challenges with hot reloading
1. Conclusion

## Demo Notes

See DEMO-APP.md

## Section notes

### Intro

* Bio - who I am, why I'm interested in hot reloading


### What is Hot Reloading?

* This talk will focus more on the principles and architecture.
  Hot reloading features and Redux are part of the React ecosystem,
  but they do not depend on React and many of the ideas are portable
  to other codebases

### Outline

* How Hot Reloading works
* Hot reloading views
* Hot reloading the rest of your app
* Redux
* Remaining challenges

### How Hot Reloading works - The Webpack HMR API and implementation

NB. Call out 'browserify-hmr' as an implementation for Browserify

### Using the API to enable hot reloading

- Here I'm going to be talking about how this API can be used to make
  live editing of your app possible.
- You wouldn't use these APIs directly
  in many cases, but instead use framework-specific helpers.

  eg. For React, there is a Babel plugin which will transform the source code
  of your React components to make them hot-reloadable

### Hot Reloading Views

NB. Call out 'react-transform-hmr' as a Babel plugin for React components

- How React hot reload works: [React Proxy](https://github.com/gaearon/react-proxy)

### Remaining challenges

NB. This is the part aimed more at those in the audience who might already
    be experts

#### Possible Subtopics
- Restoring non-visual state. eg. Audio playback, whether a timer is active.
  Re-apply React's diffing logic
- Preserving ephemeral state
- Creating components which combine Redux & React

## Presentation Notes

* Try to gauge familiarity with HMR and Redux early on. If audience already
  mostly familiar with HMR, spend more time on that.

## Takeaways

* Why hot reloading is useful
* How hot reloading works
 - In the module bundler
 - In the client
 - Hot updating views, models and action creators
* The relevant basic principles of the React/Redux/Elm model
  and how they enable hot reloading and useful debugging tools
 - Single, immutable state tree
 - Mutations via plain JavaScript objects that described what happened,
   combined with functions that process them
* Other things enabled by the R/R/E model:
 - Better debugging tools
 - More efficient rendering
* Where to get started to learn more

## Resources

* The videos (obviously)
* Step-by-step JS tutorial at https://github.com/happypoulp/redux-tutorial
* http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html
