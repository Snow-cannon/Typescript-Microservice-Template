const path = require('path');
const { fileURLToPath } = require('url');
const nodeExternals = require('webpack-node-externals');

// const __filename = fileURLToPath(require('url').pathToFileURL(__filename));
// const __dirname = path.dirname(__filename);

module.exports = {
    entry: './src/index.ts', // Entry point of your application
    target: 'node', // Ensures webpack handles Node.js built-in modules correctly
    externals: [nodeExternals()], // Exclude Node.js modules from the bundle
    mode: 'production', // Set to 'production' for production builds
    resolve: {
        extensions: ['.tsx', '.ts', '.js'], // Resolve these extensions
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: 'bundle.js', // Output bundle file
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
};
