module.exports = {
    reactStrictMode: true,
    images: {
      domains: ['assets.coingecko.com', 'lemontours.blob.core.windows.net', 'firebasestorage.googleapis.com'],
    },
    webpack: (config) => {
      config.module.rules.unshift({
        test: /pdf\.worker\.(min\.)?js/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[contenthash].[ext]",
              publicPath: "_next/static/worker",
              outputPath: "static/worker"
            }
          }
        ]
      });
      return config;
    }
  }