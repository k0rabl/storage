const path = require('path');

module.exports = {
  webpack: {
    alias: {
        "@root": path.resolve(__dirname, "./"),
        "@src": path.resolve(__dirname, "./src/"),
        "@configs": path.resolve(__dirname, "./src/configs"),

        "@app": path.resolve(__dirname, "./src/app"),
        "@shared": path.resolve(__dirname, "./src/shared"),
        "@features": path.resolve(__dirname, "./src/features"),
        "@store": path.resolve(__dirname, "./src/redux"),
        "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
};