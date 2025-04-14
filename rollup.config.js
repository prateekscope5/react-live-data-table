import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.js",
      format: "cjs", // CommonJS format
      exports: "auto",
    },
    {
      file: "dist/index.esm.js",
      format: "esm", // ES Module format
    },
  ],
  plugins: [
    resolve(), // Resolve dependencies
    commonjs(), // Convert CommonJS to ES6
    babel({ babelHelpers: "bundled" }), // Transpile with Babel
    postcss({
      extract: true, // Extracts CSS into a separate file
      minimize: true, // Minify the CSS
    }),
  ],
  external: ["react", "react-dom"], // Avoid bundling React
};
