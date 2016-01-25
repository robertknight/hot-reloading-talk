# React Component Hot reloading

React component hot reloading is implemented via a combination
of several modules:

1. A factory that creates proxy components which wrap a source component.
   The source component can be replaced after the proxy is created, allowing
   an initial version of a component to be replaced by a newer (hot-reloaded)
   one.

2. A Babel plugin, "react-transform", which rewrites the source code of
   modules defining React components, allowing them to be transformed or
   decorated in order to add functionality such as logging.

3. A plugin for "react-transform" which wraps all of the components in a file
   with proxy components and listens for hot updates for the module.

   When a hot update is available, the plugin loads the new version of
   the component from the updated module and updates the proxy to use
   the new version of the component.

## Component wrapper

[react-proxy](https://github.com/gaearon/react-proxy) is a library which
provides a function `createProxy` that creates a proxy component for a given
source React component.

The Proxy component has the same prototype as the source component, so
all of the lifecycle method calls on it (eg. render()) will delegate to
the source component. Therefore the proxy looks and behaves the same as
the source.

The Proxy has a method `update()` which allows the source component to be
replaced. This dynamically changes the prototype of the proxy to point
to the prototype for the replacement, so all subsequent calls to lifecycle
methods will delegate to the new source component. However, the proxy's
state is unaffected, so the state of the component is preserved when
it is updated.


## Babel transform

The Babel transform and react transform plugins together rewrite
the source for modules defining React components to wrap all of them
with proxies and listen for hot updates.
