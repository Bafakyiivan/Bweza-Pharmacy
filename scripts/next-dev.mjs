import { spawn } from "node:child_process";

const input = process.argv.slice(2);
const args = ["dev"];

for (let index = 0; index < input.length; index += 1) {
  const argument = input[index];
  if (argument === "--host") {
    args.push("--hostname", input[index + 1]);
    index += 1;
  } else if (argument !== "--strictPort") {
    args.push(argument);
  }
}

const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", ...args], {
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
