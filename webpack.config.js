const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

function dashboardConfig() {
    return {
        mode: isProd ? 'production' : 'development',
        entry: {
            app: './src/index.ts'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/dist/',
            filename: 'index.js',
            library: '@iplsplatoon/vue-components',
            libraryTarget: 'umd'
        },
        externals: {
            vue: {
                commonjs: 'vue',
                commonjs2: 'vue',
                amd: 'vue',
                root: 'Vue'
            }
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
                                sourceMap: !isProd,
                                esModule: false
                            }
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProd,
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
            })
        ],
        optimization: (isProd) ? {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    common: {
                        minChunks: 2
                    },
                    defaultVendors: false,
                    default: false
                }
            }
        } : undefined
    };
}

module.exports = dashboardConfig();
