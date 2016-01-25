Webpack Hot reloading
=====================

1. Add HMR runtime to bundle. Done via "--hot" argument to "webpack"
   or by adding a new instance of HotModuleReplacementPlugin to
   the webpack config

   This does two things.

   1) Whenever the bundle is regenerated, webpack will generate a
      a JSON manifest file containing the chunk IDs of the chunks which
      changed, plus a hash that should be used for the next update check.

      For each chunk with changed modules, it generates a
      '<chunk ID>.<hash ID>.hot-update.js' file which consists of a function
      call to `webpackHotUpdate(<chunk ID>, {
        <id of changed module>: function(module, exports, require) {
          // updated code for module
        }
      })`

   2) To the generated bundles, it adds a runtime which can poll or receive
   notifications of HMR updates and apply the updates to the bundle.

    Relevant files:

    - JsonpMainTemplate.js which defines a function for downloading
      the manifest file and a function for fetching the '.hot-update.js' file
      and adding it to the page via a <script> tag.
    - HotModuleReplacement.runtime.js

    - JsonpHotUpdateChunkTemplatePlugin.js - The template for
      '<chunk ID>.<hash ID>.hot-update.js' files

   3) The HMR runtime exposes a 'module.hot' API to the runtime code which allows
      the app to initiate a check for available updates and for modules to register
      listeners that are called when an update is available for one of their
      dependencies.

      Modules can register a callback to indicate that they can apply an update
      for one of their dependencies by calling module.accept([<deps>], function ([changed module IDs]) {
        // inside this function, require(<module name or ID>) will return the
        // updated module
      });

      module.check() will trigger a call to download an update manifest.
      If one is found, Webpack will visit each of the changed modules and query
      whether they can apply the update. If so, the module.accept() callback is
      called, otherwise Webpack will visit the parent of that module and check
      whether it can apply the update and so on, all the way to the root of
      the app.

      If an update cannot be handled, the HMR system will enter an "abort"
      state and return the error to the update() callback. If an exception
      occurs during one of the accept() handlers, the HMR system will
      enter a "fail" state.

      Typically the root module of the app will listen for updates to the
      main components - eg. the root.

## HMR implementation notes

* The HMR plugin parses references to 'module.hot.accept' and replaces
  dependency names with chunk IDs

## Config options

```ts
output: {
  /**
   * The filename of the JSON manifest which is generated each time the
   * bundle is updated when HMR is enabled.
   *
   * Defaults to [hash].hot-update.json
   */
  hotUpdateMainFilename: string;
  /**
   * The filename of the JS file which is generated for each updated chunk
   * when HMR is enabled.
   *
   * This consists of a JSONP callback which invokes the hot update function
   * defined by the hotUpdateFunction option
   *
   * Defaults to "[id].[hash].hot-update.js"
   */
  hotUpdateChunkFilename: string;
  /**
   * The name of the callback function which is invoked when a hot update
   * is downloaded. Defaults to 'webpackHotUpdate'
   */
  hotUpdateFunction: string;
}
```
