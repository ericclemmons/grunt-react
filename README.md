# grunt-react [![Build Status](https://travis-ci.org/ericclemmons/grunt-react.png?branch=master)](https://travis-ci.org/ericclemmons/grunt-react)

> Grunt task for compiling [Facebook React](http://facebook.github.io/react/)'s .jsx templates into .js

It also works great with `grunt-browserify`!

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
        extension:    'js'  // Default,
        ignoreMTime:  false // Default
      },
      files: {
        'path/to/output/dir': 'path/to/jsx/templates/dir'
      }
    },
  },
})
```

- - -

### Recommended Usage
Writing your applications in CommonJS format will allow you to use [Browserify](http://browserify.org/) to
concatenate your files.  Plus, with `grunt-react`, your templates will be converted from JSX to JS *automatically*!

First, install `grunt-browserify` to your project:

```shell
npm install grunt-browserify --save-dev
```

Second, register `grunt-browserify` in your Gruntfile:

```js
grunt.loadNpmTasks('grunt-browserify')
```

Finally, add the following task to your Gruntfile:

```js
browserify:     {
  options:      {
    transform:  [ require('grunt-react').browserify ]
  },
  app:          {
    src:        'path/to/source/main.js',
    dest:       'path/to/target/output.js'
  }
}
```

You've successfully concatenated your JSX & JS files into one file!


### Options

#### options.extension
Type: `String`
Default value: `js`

Extension of files to search for JSX-syntax & convert to JS.

#### options.ignoreMTime
Type: `Boolean`
Default value: `false`

Speed up compilation of JSX files by skipping files not modified since last pass.

- - -

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

### v0.4.1

- Add logging to make it easier catch errors, thanks to @lorefnon ([#5](https://github.com/ericclemmons/grunt-react/pull/5))

### v0.4.0

- Update to react-tools ~0.4.0, thanks to @Agent-H ([#3](https://github.com/ericclemmons/grunt-react/pull/3))

### v0.3.0

- No longer uses `bin/jsx`, thanks to @petehunt ([#2](https://github.com/ericclemmons/grunt-react/pull/2))
- Add `ignoreMTime` option

### v0.2.0

- Add `require('grunt-react').browserify()` and `require('grunt-react').source()` for compiling within Node

### v0.1.0

- Initial release
