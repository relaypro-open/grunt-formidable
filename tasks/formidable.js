'use strict';

module.exports = function(grunt) {
    var path = require('path'),
        lang = require('mercenary/lang'),
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
                    // Template directory globbing patterns, defaults to ['**/templates'].
                    templates: null,
                    // The template rendering engine to use. Defaults to 'swig'.
                    templating: null,
                    // An object or array of two-tuples mapping plugin module names to their
                    // configuration data.
                    plugins: null,
                    // Global template context, useful for passing environment variables
                    // from grunt into a formidable project's templates.
                    context: null,
                    // Context key name for the rendering metadata that will be passed into
                    // template contexts. Defaults to 'meta'.
                    meta: null,
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

            try {
                // Instantiate the formidable instance, invoke it and wait for the results.
                (require('formidable/settings')
                // Create a unique name for these settings.
                .configure(
                    path.resolve(
                        path.join(
                            options.root,
                            this.target || 'default',
                            'settings.js')))
                // Load the settings.
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
                                grunt.fail.fatal(message, code || 1);
                            }
                        },
                        verbose: grunt.option('verbose') || false,
                        debug: grunt.option('debug') || false
                    }))()
                .then(function() {
                    done(true);
                }));
            } catch (error) {
                grunt.fail.fatal(error.stack, 1);
            }
        });
};
