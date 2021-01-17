import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup//plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/env", "@babel/preset-react"],
    }),
    commonjs({ exclude: "/src/components/Flags/Af.js" }),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss(),
  ],
};
