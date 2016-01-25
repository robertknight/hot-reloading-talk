Plugins can hook into various steps of the compilation and
generate additional files.

This could be used to generate a manifest file for the compilation
which lists all the generated files for example.

This could then be used when rendering templates on the client or
server, eg of the form:

```js
{
  "[filename]": {
    scripts: [
      // list of script bundles that need to be included for [filename]
    ],
    styles: [
      // list of CSS files that need to be included for [filename]
    ]
  }
}
```
