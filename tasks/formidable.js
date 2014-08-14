'use strict';

module.exports = function(grunt) {
    var path = require('path'),
        lang = require('mercenary').lang,
        extend = lang.extend;

    grunt.task.registerMultiTask(
        'formidable',
        'Generate a static site with formidable',
        function() {
            var done = this.async(),
                options = this.options({
                    // The root of the project, from which other paths will be resolved.
                    // Defaults to './src' with respect to the grunt base directory
                    // (usually the same as the grunt file).
                    root: path.join('src'),
                    // The build directory into which the site's files will be generated.
                    // Defaults to '../build' with respect to the root.
                    build: null,
                    // The path to the top-level urls module with respect to the root and
                    // without the '.js' extension. Defaults to 'urls'.
                    urls: null,
                    // Template directory globbing patterns for findiing directories in
                    // addition to the standard '**/templates' pattern. Defaults to [].
                    templates: null,
                    // The template rendering engine to use. Defaults to 'swig'.
                    templating: null,
                    // Plugins for swig.
                    swig: {
                        filters: {},
                        tags: {},
                        extensions: {}
                    },
                    // Allow overwrite of existing rendered files. When false, an attempted
                    // overwrite will raise a fatal exception. Defaults to true.
                    overwrite: null
                });

            // Instantiate the formidable instance, invoke it and wait for the results.
            (require('formidable/settings')
            // The simulated settings.js path.
            .configure(path.join(options.root, 'settings.js'))
            // The settings.
            .load(
                extend({}, options, {
                    log: {
                        info: function(message) {
                            grunt.log.ok(message || '');
                        },
                        warn: function(message) {
                            grunt.log.error(message || '');
                        },
                        fail: function(message, code) {
                            grunt.fail.fatal(message, code);
                        }
                    },
                    verbose: grunt.option('verbose') || false,
                    debug: grunt.option('debug') || false
                }))()
            .then(function() {
                done(true);
            }));
        });
};
