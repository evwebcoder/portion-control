const elixir = require('laravel-elixir');

require('laravel-elixir-livereload');
require('laravel-elixir-vue');

process.env.DISABLE_NOTIFIER = true;

elixir.config.css.autoprefix = {
    enabled: true,

    options: {
        cascade: true,
        browsers: ['last 1 version', 'ie >= 11', '> 10%']
    }
};

elixir(function(mix) {

    // ---------- CSS

    mix.sass('./source/sass/style-app.scss', './resources/style-app.css')

       // Video listing page
        .styles([
            './source/libraries/bootstrap/bootstrap.min.css',
            './resources/style-app.css'
        ], './resources/packages-app.css');


    // ---------- JAVASCRIPT
    /*
    // Video listing page
    mix.scripts([
            './source/libraries/json3/json3.min.js',
            './source/libraries/jquery/jquery-3.2.1.min.js',
            './source/libraries/jquery/jquery-migrate-3.0.0.min.js',
            './source/libraries/underscorejs/underscore-min.js',
            './source/libraries/backbonejs/backbone-min.js',
            './source/libraries/cssua/cssua.min.js',
            './source/libraries/royalslider/jquery.royalslider.min.js',

            './source/scripts/global.js',
            './source/scripts/video-listing.js'

        ], './resources/packages-app.js');
        */
    // ---------- LIVE RELOAD

    mix.livereload([
        './resources/*.css'
        //'./resources/*.js'
    ]);
});
