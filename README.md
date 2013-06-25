# grunt-react

> Grunt task for compiling [Facebook React](http://facebook.github.io/react/)'s .jsx templates into .js

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-react --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-react');
```

## The "react" task

### Overview
In your project's Gruntfile, add a section named `react` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  react: {
    app: {
      options: {
        extension: 'js' // Default
      },
      files: {
        'path/to/output/dir': 'path/to/jsx/templates/dir'
      }
    },
  },
})
```

### Options

#### options.extension
Type: `String`
Default value: `js`

Extension of files to search for JSX-syntax & convert to JS.

### Usage Examples

#### Recommended Options

I recommend naming your React Components with the `.jsx` extension:

```js
/**
 * @jsx React.DOM
 */

var MyComponent = React.createClass({
  ...
  render: function() {
    return (
      <p>Howdy</p>
    );
  }
});
```

Then, set your Gruntfile to use:

```js
grunt.initConfig({
  react: {
    options: {
      extension: 'jsx'
    },
    app: {
      files: {
        'path/to/output/dir': 'path/to/jsx/templates/dir'
      }
    }
  },
})
```

This will output the following:

```js
/**
 * @jsx React.DOM
 */

var MyComponent = React.createClass({displayName: 'MyComponent',
  render: function() {
    return (
      React.DOM.p(null, "Howdy")
    );
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

### v0.1.0

- Initial release
