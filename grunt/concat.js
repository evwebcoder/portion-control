module.exports = {
    /* Core */    
    core_scripts: {
        src: ['source/libs/cssua/cssua.min.js'],
        dest: 'resources/libs-core.js',
        
        options: {
            separator: ';',
        }
    },
    
    core_styles: {
        src: ['source/libs/bootstrap/bootstrap.min.css'],
        dest: 'resources/libs-core.css'
    }
};