var React = require('react');

/**
 * hotReloadSupport provides a few debugging tools that are useful
 * when developing components with hot reload support enabled.
 *
 * You would normally only want to include these in DEBUG builds of
 * your application.
 */

/**
 * Renders a bright red box displaying details of
 * an error that occurred whilst rendering a component.
 */
function ErrorBox(props) {
  var stackStyle = {
    maxWidth: 500,
    maxHeight: 300,
    padding: 10,
    overflow: 'auto',
    color: 'black',
    backgroundColor: 'pink',
  };

  var errorBoxStyle = {
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
  };

  return <div style={errorBoxStyle}>
    Error rendering {props.name}: {props.error.toString()}
    <pre style={stackStyle}>{props.error.stack}</pre>
  </div>;
}

/**
 * Wraps the render() method of a React component in order
 * to handle errors.
 *
 * If an error occurs, the render function returns a bright red box
 * displaying the details of the error and a stack trace.
 */
function catchErrors(Component) {
  var name = Component.displayName || Component.name;
  if (Component.prototype.render) {
    // A stateful component. Monkey-patch the render() method
    var originalRender = Component.prototype.render;
    Component.prototype.render = function () {
      try {
        return originalRender.apply(this, arguments);
      } catch (err) {
        return <ErrorBox name={name} error={err}/>;
      }
    };
    return Component;
  } else {
    // A simple stateless function component
    var wrapped = function () {
      try {
        return Component.apply(this, arguments);
      } catch (err) {
        return <ErrorBox name={name} error={err}/>;
      }
    };
    wrapped.displayName = name;
    return wrapped;
  }
}

module.exports = {
  catchErrors: catchErrors,
};
