const withCSS = require("@zeit/next-css");
module.exports = withCSS({
  cssModules: true
});
const webpack = require("webpack");
require("dotenv").config();

module.exports = {
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        defaultLoaders.babel,
        {
          loader: require("styled-jsx/webpack").loader,
          options: {
            type: "scoped"
          }
        }
      ]
    });

    return config;
  }
};

const path = require("path");

module.exports = {
  webpack: config => {
    // Unshift polyfills in main entrypoint.
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      if (entries["main.js"]) {
        entries["main.js"].unshift("./client/polyfills.js");
      }
      return entries;
    };
    // This lib has an arrow fn causing IE11 to explode
    config.module.rules.push({
      test: path.resolve("./node_modules/superagent-charset/index.js"),
      loader: "babel-loader",
      options: {
        babelrc: false,
        cacheDirectory: true,
        presets: ["@babel/preset-env"]
      }
    });

    config.module.rules.push({
      test: path.resolve("./node_modules/next-server/dist/lib/amp.js"),
      loader: "babel-loader",
      options: {
        babelrc: false,
        cacheDirectory: true,
        presets: ["@babel/preset-env"]
      }
    });

    config.module.rules.push({
      test: path.resolve("./node_modules/next-server/amp.js"),
      loader: "babel-loader",
      options: {
        babelrc: false,
        cacheDirectory: true,
        presets: ["@babel/preset-env"]
      }
    });

    config.module.rules.push({
      test: path.resolve(
        "./node_modules/react-amphtml/dist/amphtml/amphtml.js"
      ),
      loader: "babel-loader",
      options: {
        babelrc: false,
        cacheDirectory: true,
        presets: ["@babel/preset-env"]
      }
    });

    config.module.rules.push({
      test: path.resolve(
        "./node_modules/react-amphtml/dist/amphtml/components/AmpState.js"
      ),
      loader: "babel-loader",
      options: {
        babelrc: false,
        cacheDirectory: true,
        presets: ["@babel/preset-env"]
      }
    });

    config.module.rules.push({
      test: path.resolve(
        "./node_modules/react-amphtml/dist/amphtml/components/Html.js"
      ),
      loader: "babel-loader",
      options: {
        babelrc: false,
        cacheDirectory: true,
        presets: ["@babel/preset-env"]
      }
    });

    config.module.rules.push({
      test: path.resolve(
        "./node_modules/react-amphtml/dist/amphtml/components/Script.js"
      ),
      loader: "babel-loader",
      options: {
        babelrc: false,
        cacheDirectory: true,
        presets: ["@babel/preset-env"]
      }
    });

    config.module.rules.push({
      test: path.resolve("./node_modules/react-amphtml/dist/helpers/Action.js"),
      loader: "babel-loader",
      options: {
        babelrc: false,
        cacheDirectory: true,
        presets: ["@babel/preset-env"]
      }
    });

    config.module.rules.push({
      test: path.resolve("./node_modules/react-amphtml/dist/helpers/Bind.js"),
      loader: "babel-loader",
      options: {
        babelrc: false,
        cacheDirectory: true,
        presets: ["@babel/preset-env"]
      }
    });

    config.module.rules.push({
      test: path.resolve(
        "./node_modules/react-amphtml/dist/lib/contextHelper.js"
      ),
      loader: "babel-loader",
      options: {
        babelrc: false,
        cacheDirectory: true,
        presets: ["@babel/preset-env"]
      }
    });

    return config;
  }
};

module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };
    /**
     * Returns environment variables as an object
     */
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    /** Allows you to create global constants which can be configured
     * at compile time, which in our case is our environment variables
     */
    config.plugins.push(new webpack.DefinePlugin(env));
    return config;
  }
};
