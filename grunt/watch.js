 module.exports = {
    /* CSS / JS */
    css: {
        files: ['source/sass/**/*.scss'],
        tasks: ['compass']
    },
    
    
    js: {
        files: [
            'source/scripts/**/*.js',
            'source/scripts/*.js'
        ],
        
        tasks: ['newer:uglify:dist']
    },
    
    /* Core */
    core_scripts: {
        files: ['source/libs/cssua/cssua.min.js'],
        tasks: ['concat:core_scripts']
    },
    
    core_styles: {
        files: ['source/libs/bootstrap/bootstrap.min.css'],
        tasks: ['concat:core_styles']
    }
  
    /* LiveReload 
    livereload: {
        files: [
            'resources/*.css',
            'resources/*.js'
        ],
        
        options: { livereload: true },
    }
    */
};