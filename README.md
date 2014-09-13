grunt-formidable
================

The official Grunt plugin for the
<a href="https://github.com/republicwireless-open/formidable" target="_blank">__formidable__</a>
static site generator


## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used
<a href="http://gruntjs.com/" target="_blank">__Grunt__</a> before, be sure to check out the
<a href="http://gruntjs.com/getting-started" target="_blank">__Getting Started__</a> guide, as it
explains how to create a
<a href="http://gruntjs.com/sample-gruntfile" target="_blank">__Gruntfile__</a> as well as install
and use Grunt plugins. Once you're familiar with that process, you may install this plugin with
this command:

```bash
npm install grunt-formidable --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line
of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-formidable');
```

### Formidable task

You can run this task with the `grunt formidable` command.

#### Options

##### root

Type: `String`<br>
Default: `'src'`

The path to the source files, with respect to the Gruntfile, that will be used by __formidable__
to build your site.

##### build

Type: `String`<br>
Default: `'build'`

The path to the build directory, with respect to the Gruntfile, where __formidable__ will output
your generated site. It may not be a parent or a child of the `root` directory.

##### templates

Type: `String` or `Array` of `String`s<br>
Default: `'**/templates'`

The glob pattern, with respect to the `root` directory, which __formidable__ will use to locate
template files.

### Example

Here's an example Gruntfile to help you get started:

```javascript
'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        formidable: {
            all: {
                options: {
                    src: 'source',
                    build: 'dist',
                    templates: '{articles,news,pages}/templates'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-formidable');

    grunt.registerTask('build', ['formidable:all']);
};
```

More options are available, so please review the source code for details.
