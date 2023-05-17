module.exports = {
    apps: [
        {
            name: 'primary',
            instances: '1',
            script: './build/index.js',
            exec_mode: 'cluster',
        },
        {
            name: 'replica',
            instances: 'max',
            script: './build/index.js',
            exec_mode: 'cluster',
        },
    ],
};
