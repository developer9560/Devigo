const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.ANALYZE === 'true';

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Optimize bundle size
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 240000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          automaticNameDelimiter: '~',
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
              name(module) {
                // Get the name. E.g. node_modules/packageName/sub/path
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                // Return meaningful name if it's a major package
                if (
                  ['react', 'react-dom', 'react-router-dom', 'lottie-react', '@mui'].includes(
                    packageName.split('/')[0]
                  )
                ) {
                  return `vendor.${packageName.replace('@', '')}`;
                }
                return 'vendor';
              },
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // Add compression for production builds
      if (isProduction) {
        webpackConfig.plugins.push(
          new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
          })
        );
      }

      // Add bundle analyzer when ANALYZE=true
      if (isAnalyze) {
        webpackConfig.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: true,
          })
        );
      }

      // Return the modified config
      return webpackConfig;
    },
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@admin': path.resolve(__dirname, 'src/admin'),
    },
  },
  // Add Jest configuration for testing
  jest: {
    configure: {
      moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@assets/(.*)$': '<rootDir>/src/assets/$1',
        '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@admin/(.*)$': '<rootDir>/src/admin/$1',
      },
    },
  },
  // Add custom environment variables
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          return webpackConfig;
        },
      },
    },
  ],
};