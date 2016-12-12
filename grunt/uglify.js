module.exports = {
    dist: {
        files: {
            /* Core */
            'resources/packages-global.js': [
                'source/scripts/global.js'
            ]
            
        }
    },
    
    options: {
        codegen: { quote_keys: true },
        mangle: true,
        screwIE8: true,
        sourceMap: true,
        squeeze: { dead_code: false }
    }
};

