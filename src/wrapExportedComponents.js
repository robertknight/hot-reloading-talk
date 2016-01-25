var createProxy = require('react-proxy').default;

/**
 * This module exports a function which wraps exported
 * components with proxies in order to support
 * hot reloading.
 *
 * This is a simplified version of what the 'react-transform-hmr'
 * Webpack plugin does.
 */

function componentName(Component) {
  return Component.displayName || Component.name;
}

// tracks mounted versions of a component in an
// 'instances' array
function trackInstancesOfComponent(Component, instances) {
  var originalMountHandler = Component.prototype.componentDidMount;
  var originalUnmountHandler = Component.prototype.componentWillUnmount;
  Component.prototype.componentDidMount = function () {
    instances.push(this);
    originalMountHandler.apply(this, arguments);
  };
  Component.prototype.componentWillUnmount = function () {
    instances.splice(instances.indexOf(this), 1);
    originalUnmountHandler.apply(this, arguments);
  };
}

function wrapComponent(Component, name, hotData, proxies, instances) {
  // keep track of live instances of the component, so we can
  // forcibly update them when their module is updated
  if (hotData.instances && hotData.instances[name]) {
    instances[name] = hotData.instances[name];
  } else {
    instances[name] = [];
  }
  trackInstancesOfComponent(Component, instances[name]);

  // setup a proxy for the component. When the component is hot-reloaded,
  // we'll change the component that the proxy points to and update
  // existing instances
  if (hotData.proxies && hotData.proxies[name]) {
    console.log('Updating', instances[name].length, 'instances of', componentName(Component));
    proxies[name] = hotData.proxies[name];
    var proxy = hotData.proxies[name];
    proxy.update(Component);

    // force-update existing instances so that they reflect any changes
    // to the render() function
    instances[name].forEach(function (instance) {
      instance.forceUpdate();
    });
  } else {
    console.log('Enabling hot reloading for', componentName(Component));
    proxies[name] = createProxy(Component);
  }
  return proxies[name];
}

function wrapExportedComponents(module) {
  if (typeof module.exports !== 'function') {
    return;
  }

  try {
    if (module.hot) {
      // notify Webpack that this module can accept updates
      // for itself
      module.hot.accept();

      var hotData = module.hot.data || {};
      
      var instances = {};
      var proxies = {};

      // find all of the components exported by the module and wrap
      // them with proxies which are updated when the module is updated.
      if (typeof module.exports === 'function') {
        // module exporting as single React component
        var Component = module.exports;
        var name = 'default';
        module.exports = wrapComponent(Component, name, hotData, proxies, instances);
      } else {
        // module exporting multiple React components
        Object.keys(module.exports).forEach(function (key) {
          if (typeof module.exports[key] !== 'function') {
            return;
          }
          var Component = module.exports[key];
          module.exports[key] = wrapComponent(Component, key, hotData, proxies, instances);
        });
      }

      // export the proxied version of the component from
      // the module. This proxy will not change when the module is
      // hot-reloaded, so React will keep the state of the existing
      // component
      module.exports = proxies[name].get();

      // when the old version of the module is unloaded,
      // save the proxy so that when the new version is loaded,
      // we can change the proxied component with proxy.update().
      //
      // This preserves the state of the React component
      module.hot.addDisposeHandler(function (data) {
        data.proxies = proxies;
        data.instances = instances;
      });
    }
  } catch (err) {
    console.error('Error accepting update', err);
  }
}

module.exports = wrapExportedComponents;

