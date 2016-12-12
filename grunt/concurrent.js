module.exports = {
    build: [
        ['compass'],
        'concat',
        'uglify'
    ],
    
    options: { logConcurrentOutput: true }
};