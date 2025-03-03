module.exports = function (config) {
   config.set({
      frameworks: ["jasmine"],
      files: ["test/**/*.spec.tsx"],
      preprocessors: {
         "test/**/*.spec.tsx": ["webpack", "sourcemap"],
      },
      webpack: {
         mode: "development",
         resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
         },
         module: {
            rules: [
               {
                  test: /\.tsx?$/,
                  exclude: /node_modules/,
                  use: {
                     loader: "ts-loader",
                     options: {
                        transpileOnly: true,
                     },
                  },
               },
            ],
         },
      },
      browsers: ["Chrome"],
      reporters: ["progress"],
      singleRun: true,
   });
};
