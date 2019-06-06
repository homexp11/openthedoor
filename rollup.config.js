import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import replace from "rollup-plugin-replace";

const production = !process.env.ROLLUP_WATCH;

const dotenv = require("dotenv");
dotenv.config();

const ENVIRONMENT_DOOR_LOCK_STATUS_ENDPOINT =
  process.env.ENVIRONMENT_DOOR_LOCK_STATUS_ENDPOINT;

const ENVIRONMENT_HOMEY_LOGIC_WEBHOOK =
  process.env.ENVIRONMENT_HOMEY_LOGIC_WEBHOOK;

const ENVIRONMENT_HOMEY_CLOUD_ID = process.env.ENVIRONMENT_HOMEY_CLOUD_ID;

const ENVIRONMENT_UNLOCK_EVENT = process.env.ENVIRONMENT_UNLOCK_EVENT;

const ENVIRONMENT_LOCK_EVENT = process.env.ENVIRONMENT_LOCK_EVENT;

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/bundle.js"
  },
  plugins: [
    replace({
      ENVIRONMENT_DOOR_LOCK_STATUS_ENDPOINT,
      ENVIRONMENT_HOMEY_LOGIC_WEBHOOK,
      ENVIRONMENT_HOMEY_CLOUD_ID,
      ENVIRONMENT_UNLOCK_EVENT,
      ENVIRONMENT_LOCK_EVENT
    }),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write("public/bundle.css");
      }
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve(),
    commonjs(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
