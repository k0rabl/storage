import { resolve } from 'path';

export const webpack = {
  alias: {
    "@root": resolve(__dirname, "./client/"),
    "@src": resolve(__dirname, "./client/src/"),
    "@configs": resolve(__dirname, "./client/src/configs"),

    "@app": resolve(__dirname, "./client/src/app"),
    "@shared": resolve(__dirname, "./client/src/shared"),
    "@features": resolve(__dirname, "./client/src/features"),
    "@store": resolve(__dirname, "./client/src/redux"),
    "@pages": resolve(__dirname, "./client/src/pages"),
  },
};