const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function config() {
    return {
        mode: 'development',
        entry: {
            app: './examples/index.ts'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js',
            clean: true
        },
        resolve: {
            extensions: ['.js', '.json', '.vue', '.ts', '.tsx']
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                esModule: false
                            }
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/,
                    exclude: /node_modules/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                esModule: false
                            }
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        appendTsSuffixTo: [/\.vue$/]
                    }
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    extensions: {
                        vue: {
                            enabled: true,
                            compiler: '@vue/compiler-sfc'
                        }
                    }
                }
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                title: 'Example',
                template: 'examples/template.html'
            })
        ],
        devServer: {
            static: './dist'
        }
    };
}

module.exports = config();
