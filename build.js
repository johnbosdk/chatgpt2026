const fs = require("node:fs");
const path = require("node:path");
const JavaScriptObfuscator = require("javascript-obfuscator");

const root = __dirname;
const output = path.join(root, "dist");

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const file of ["index.html", "styles.css"]) {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
}

const source = fs.readFileSync(path.join(root, "script.js"), "utf8");
const result = JavaScriptObfuscator.obfuscate(source, {
  compact: true,
  simplify: true,
  identifierNamesGenerator: "hexadecimal",
  renameGlobals: false,
  stringArray: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayThreshold: 0.65,
  stringArrayEncoding: [],
  controlFlowFlattening: false,
  deadCodeInjection: false,
  selfDefending: false,
  debugProtection: false,
  disableConsoleOutput: false
});

fs.writeFileSync(
  path.join(output, "script.obfuscated.js"),
  result.getObfuscatedCode(),
  "utf8"
);

console.log("Build complete: dist/ contains the static site and obfuscated JavaScript.");
