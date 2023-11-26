import path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ImageMinimizerPlugin  from 'image-minimizer-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ImageminWebpWebpackPlugin from 'imagemin-webp-webpack-plugin';
import fs from 'fs';
import webpack from 'webpack';

const src = './src';
const dist = './dist';

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
const otherFilename = (ext) => isDev ? `[name]${ext}` : `[name].[contenthash]${ext}`;

const htmlPages = [];
const pages = fs.readdirSync('./src');

pages.forEach(page => {
    if (page.endsWith('.html')) htmlPages.push(page);
});

const processingHtml = htmlPages.map(page => {
    return new HtmlWebpackPlugin({
        template: path.resolve(src, page),
        filename: page,
        minify: { collapseWhitespace: isProd }
    });
});

// Plugins

function plugins(processingHtml) {

    const activePlugins = [
        new MiniCssExtractPlugin({ filename: `./css/${filename('css')}` }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(src, './files/'), to: path.resolve(dist, './files/'), noErrorOnMissing: true },
                { from: path.resolve(src, './img/'), to: path.resolve(dist, `./img/[name][ext]`), noErrorOnMissing: true }
            ]
        })
        // new webpack.ProvidePlugin({
        //   process: 'process/browser',
        // })
    ].concat(processingHtml);

    return activePlugins;
}

// For optimization

function optimization() {
    const config = {
        minimize: true,
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
            new ImageMinimizerPlugin({
              minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                  plugins: [
                    ["gifsicle", { interlaced: true }],
                    ["jpegtran", { progressive: true }],
                    ["optipng", { optimizationLevel: 5 }],
                    [
                      "svgo",
                      {
                        plugins: [
                          {
                            name: "preset-default",
                            params: {
                              overrides: {
                                removeViewBox: false,
                                addAttributesToSVGElement: {
                                  params: {
                                    attributes: [
                                      { xmlns: "http://www.w3.org/2000/svg" },
                                    ],
                                  },
                                },
                              },
                            },
                          },
                        ],
                      },
                    ],
                  ],
                },
              },
            }),
            new ImageminWebpWebpackPlugin()
        ];
    }

    return config;
}


export default {
    entry: path.resolve(src, './ts/main.tsx'),
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 3000,
        static: dist,
        devMiddleware: {
            publicPath: '/car/',
            writeToDisk: (filePath) => {
                return /^(?!.*(hot)).*/.test(filePath);
            },
        },
    },
    module: {
        rules: [
            // Typescript

            {
               test: /\.tsx?$/,
               use: 'ts-loader',
               exclude: /node_modules/ 
            },

            // CSS

            {
               test: /\.(c|sa|sc)ss$/i,
               use: [ 
                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
                ],
            },

            // HTML
            
            {
                test: /\.html$/,
                use: [ {
                  loader: 'html-loader',
                  options: {
                    minimize: true
                  }
                }]
            },

            // Images

            {
              test: /\.(png|svg|jpg|jpeg|webp)$/i,
              type: 'asset/resource',
              generator: {
                filename: `./img/${otherFilename('[ext]')}`
              }
            },
            
            // Fonts

            {
                test: /\.woff2?$/i,
                type: 'asset/resource',
                generator: {
                  filename: `./fonts/${otherFilename('[ext]')}`
                }
            },

        ]
    },
    resolve: {
        // Typescript\
        
        modules: ['node_modules', 'src/components'],

        extensions: ['.tsx', '.ts', '.js', ".css", ".scss" ],
    },

    plugins: plugins(processingHtml),
    optimization: optimization(),
    devtool: isProd ? false : 'source-map',
    node: {global: true},

    output: {
        filename: `./js/${filename('js')}`,
        publicPath: '/',
        path: path.resolve(dist),
        clean: true
    },
}