var React = require('react');

/**
 * Thin React wrappers around the [Material Design Lite](https://www.getmdl.io/)
 * elements.
 */

function upgrade(element) {
  /* global componentHandler */
  if (!element) {
    return;
  }
  componentHandler.upgradeElement(element);
}

function Button(props) {
  return <button onClick={props.onClick} ref={upgrade} className="mdl-button mdl-js-button">
  {props.children}
  </button>;
}

function Spinner() {
  return <div>
    <div ref={upgrade} className="mdl-spinner mdl-js-spinner is-active"></div>
  </div>;
}

function TextField(props) {
  return <div className="mdl-textfield mdl-js-textfield" ref={upgrade}>
    <input className="mdl-textfield__input"
      type="text"
      name={props.name}
      ref={upgrade}/>
    <label className="mdl-textfield__label" htmlFor={props.name}>{props.placeholder}</label>
  </div>;
}

module.exports = {
  Button: Button,
  Spinner: Spinner,
  TextField: TextField,
};
